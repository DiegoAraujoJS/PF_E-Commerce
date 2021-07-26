import config from '../../lib/config'
import transporter from '../../transporter/transporter'
async function mail (to: string, subject: string, text: string, from?: string) {
    const mailOptions = {
        to: to,
        subject: subject,
        //text: text,
        html: 
            `<div style = "display: flex;
                        justify-content: space-between;
                        align-items:center;
                        background-color: #343434";
                        padding-top: 10px;
                        padding-bottom: 10px>
                <div style = "display: flex;
                            align-items:center">
                    <img src ="https://raw.githubusercontent.com/DiegoAraujoJS/PF_E-Commerce/dev/client/src/images/logotipo.png" alt = "logo"  width = 20%  height = 20% style = "margin-left:5px"/>
                </div>
                <div style = "margin-right: 5px;
                              width: 100%;
                              text-align: left">
                    <h4  style = "color: #ab966c;
                                font-size: 15px">
                        Agosto 2021
                    </h4>
                    <p style = " color: #dedede;
                                font-size: 15px">
                        telf: 555-555-555
                    </p>
                </div>
            </div>
        <div>
            <img src = "https://www.diariamenteali.com/medias/Libros-autoayuda-adolescentes-1900Wx500H?context=bWFzdGVyfHJvb3R8OTgwODl8aW1hZ2UvanBlZ3xoN2IvaGRmLzkwNzQ0NjAwMDAyODYvTGlicm9zLWF1dG9heXVkYS1hZG9sZXNjZW50ZXNfMTkwMFd4NTAwSHwwNzE4MmEzNmI3OTg1ODJiNDg4MDBmMjVkYzY5ZGVhMDBjMjFjYTI0ZTdmMDg5MmM3NjNlMzIyNjRmODIxYjEx" alt = "estuante" width = 100% />
        </div>
        <div style = "background-color: #343434;
                        padding-top: 30px;
                        padding-bottom: 30px">
            <h3 style = "margin-left: 20px;
                    margin-right: 20px;
                    color: #dedede">
            ${subject}
            </h3>
            <p style = "margin-left: 20px;
                    margin-right: 20px;
                    color: #dedede">
            ${text}
            </p>
        </div>`,
        

        from: from || config.gmail_user
    }
    
    const mail = await transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log('error', err)
            return err
        } else {
            console.log('sent', data)
            return data
        }
    })
    
}
export default mail