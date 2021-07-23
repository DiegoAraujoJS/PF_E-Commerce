import { useEffect, useRef, useState } from 'react';
import { bindActionCreators } from "redux";
import logo from '../../images/logotipo.png';
import style from './login.module.css';
import { loginWithGoogle } from '../../firebase';
import { Link } from 'react-router-dom'
import CSS from 'csstype';
import { actionsType } from '../../constants/constants';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from 'react-redux'
import getCookieValue from '../../cookieParser';
import { getUserLoged, modificarUsuarioLogueado, modificarCantidadClasesPorComprar } from '../../Actions/Actions';
import { store } from '../../Store/store';
import s from './login.module.css';
import { eyeOutline, eyeOffOutline } from "ionicons/icons";
import { IonIcon } from '@ionic/react';
import googleLogo from '../../images/googleLogo.png';
import Register from '../Register/Register';
import { auth } from '../../firebase'
import { setRoleOfUser } from '../../functions';
import Swal from 'sweetalert2';
function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: null, password: null })
    const [wrongPassword, setWrongPassword] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    const usuario = useSelector(state => state['user'])
    // 

    useEffect(() => {
        console.log('WHO', usuario)
    }, [showRegister])

    const handleClose = () => setShowRegister(false);
    const handleShow = () => setShowRegister(true);

    const history = useHistory()

    function handleChange(e) {
        validateErrors()
        switch (e.target.name) {
            case 'emailValue':
                setEmail(e.target.value)
                break;
            case 'passValue':
                setPassword(e.target.value)
                break;
            default:
                break;
        }

    }



    function validateErrors() {
        if (!email) {
            //email, a pesar de estar vacío y entrar a esta validación, no cambia el estado
            setErrors({ ...errors, email: 'Se necesita un E-mail' })
        } else if (!/\S+@{1}[a-zA-Z]+\.{1}[a-z]{3}\.?[a-z]*/gm.test(email)) {
            setErrors({ ...errors, email: 'E-mail inválido' })
        } else {
            setErrors({ ...errors, email: null })
        }
        if (!/[\S]/.test(password)) {
            setErrors({ ...errors, password: 'No puede contener espacio blanco' })
        } else if (password.length < 4 || password.length > 20) {
            setErrors({ ...errors, password: 'La contraseña debe tener de 4 a 20 caracteres' })
        } else {
            setErrors({ ...errors, password: null })
        }
    }


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: `${s.botonswal}`
        },
        buttonsStyling: false
    })

    async function loginConGoogle(e) {
        e.preventDefault();
        try {
            await loginWithGoogle();
            let user = {
                lastName: 'GOOGLE',
                mail: auth.currentUser.email,
                name: auth.currentUser.displayName,
                role: 0,
                city: 'GOOGLE',
            }
            let userWithPassword = {
                ...user,
                password: 'google'
            }
            const registro = await axios.post('http://localhost:3001/api/session/register', userWithPassword, { withCredentials: true })
            if (registro.status === 200) {
                const login = await axios.post(`http://localhost:3001/api/login`, {
                    mail: auth.currentUser.email,
                    password: 'google'
                }, { withCredentials: true })
                document.cookie = `token=${JSON.stringify(login.data.token)}`
                localStorage.setItem('login', 'true')
                const user = await axios.post(`http://localhost:3001/api/verify`, {}, { headers: { Authorization: getCookieValue('token').replaceAll("\"", '') } })
                if (user !== null) props.getUserLoged({ mail: user.data.mail, name: user.data.name, lastName: user.data.lastName })
                console.log(store.getState())
                swalWithBootstrapButtons.fire(
                    'Se inicio sesión correctamente',
                    '',
                    'success'
                )
                history.push('/home');
                const usuarioActualizado = await setRoleOfUser()
                dispatch(modificarUsuarioLogueado(usuarioActualizado))
                const clases = await axios.get(`http://localhost:3001/api/carrito/all/${usuarioActualizado[1].mail}`)
                dispatch(modificarCantidadClasesPorComprar(clases.data.length));
            }
        } catch {
            console.log('Se produjo un error durante la autenticación')
        }
    }

    // async function handleSubmitRegister(values) {
    //     console.log(values)
    //     let user: UserProps = {
    //       lastName: values.lastName,
    //       mail: values.mail,
    //       name: values.name,
    //       role: values.role,
    //       city: values.city,
    //     }
    //     let userWithPassword = {
    //       ...user,
    //       password: values.password
    //     }
    //     if (values.mail === 'braiansilva@gmail.com') user.role = Role.ADMIN;
    //     try {
    //       const registro = await axios.post('http://localhost:3001/api/session/register', userWithPassword, { withCredentials: true })

    //       if (registro.status === 200) {
    //         swalWithBootstrapButtons.fire(
    //           'Se registró correctamente',
    //           'Ahora inicie sesión',
    //           'success'
    //         )
    //         handleClose('argument');
    //         history.push('/login')
    //       }
    //     }
    //     catch (error) {
    //       if (error.response && error.response.data.type === ErrorType.ALREADY_EXISTS) {
    //         alert('El usuario ya existe!')
    //       } else if (error.response && error.response.data.type === ErrorType.INCOMPLETE_INPUTS) {
    //         alert('Debe ingresar mail, nombre y apellido')
    //       }
    //     }
    //   }





    const dispatch = useDispatch();
    //   dispatch(modificarUsuarioLogueado(usuarioLogueado))

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const login = await axios.post(`http://localhost:3001/api/login`, {
                mail: email,
                password: password
            }, { withCredentials: true })
            document.cookie = `token=${JSON.stringify(login.data.token)}`
            localStorage.setItem('login', 'true')
            const user = await axios.post(`http://localhost:3001/api/verify`, {}, { headers: { Authorization: getCookieValue('token').replaceAll("\"", '') } })
            if (user !== null) props.getUserLoged({ mail: user.data.mail, name: user.data.name, lastName: user.data.lastName })
            console.log(store.getState())
            const usuarioActualizado = await setRoleOfUser()
            dispatch(modificarUsuarioLogueado(usuarioActualizado))
            const clases = await axios.get(`http://localhost:3001/api/carrito/all/${usuarioActualizado[1].mail}`)
            dispatch(modificarCantidadClasesPorComprar(clases.data.length));
            history.push('/home')
        } catch (error) {
            setWrongPassword(true)
        }
    }

    const inputRef = useRef()
    const eyeRef = useRef()

    function myFunction() {
        let showPassword: any = inputRef.current
        let eye: any = eyeRef.current

        if (showPassword && showPassword.type === "password") {
            showPassword.type = "text";
            eye.icon = eyeOutline;
        } else {
            showPassword.type = "password";
            eye.icon = eyeOffOutline;
        }
    }

    const test: CSS.Properties = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    }
    const inputMargin: CSS.Properties = {
        margin: '0px'
    }
    const eyeTest: CSS.Properties = {
        position: 'absolute',
        right: '15px'
    }



    return (
        <div className={"text-center " + style.height}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

            <div className={style.formSignin}>
                <form onSubmit={handleSubmit}>
                    <img className={s.logo} src={logo} alt='logo' width="100%"></img>

                    <p className={s.title}>Inicia sesión en tu cuenta de U Clases</p>
                    <div className="form-floating">
                        <input type='email' value={email} name='emailValue' onChange={handleChange} placeholder='Email' className={`form-control mb-3 ${s.input}`} />
                        <label htmlFor="floatingInput">Correo</label>
                    </div>
                    <div style={test} className="form-floating">
                        <input style={inputMargin} ref={inputRef} type='password' value={password} name='passValue' onChange={handleChange} placeholder='Contraseña' className={`form-control mb-3 ${s.inputPassword}`} />
                        <label htmlFor="floatingPassword">Contraseña</label>
                        {/* <i style={eyeTest} ref={eyeRef} className="fa fa-eye-slash" onClick={() => myFunction()}></i> */}
                        <IonIcon style={eyeTest} ref={eyeRef} icon={eyeOutline} className={s.iconDumb} onClick={() => myFunction()}></IonIcon>
                    </div>

                    <input type="submit" value="Iniciar sesión" className={`w-100 btn btn-primary mb-3 ${s.colorBoton}`} />

                    <div className="">
                        {wrongPassword ? <small className={s.errorMessage}>
                            El usuario o la contraseña son incorrectos</small> : null}
                    </div>

                    <div className={`w-100 btn mb-3 ${s.googleButton}`} onClick={loginConGoogle}>
                        <img src={googleLogo} className={s.googleLogo} alt='Google Logo'></img>
                        <span>Inicia sesión con Google</span>
                    </div>

                    <p>
                        ¿No tienes cuenta?
                        <Link className={s.registroLink} onClick={() => handleShow()}>
                            Regístrate
                        </Link>
                    </p>

                    <Register show={showRegister} handleClose={handleClose} />


                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUserLoged }, dispatch);
}
// const mapStateToProps = (state) => {
//     return {
//         user_mail: state.user_mail,
//         user_name: state.user_name,
//         user_lastName: state.user_lastName
//     }
// }


export default connect(null, mapDispatchToProps)(Login)



