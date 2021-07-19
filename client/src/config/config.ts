import dotenv from 'dotenv'
dotenv.config()

const config ={
    REACT_APP_GOOGLE_CALENDAR_CLIENT_ID: process.env.REACT_APP_GOOGLE_CALENDAR_CLIENT_ID || '440085109223-pj4kq9urv9mo7fhv9t9s5c2l0883ugkk.apps.googleusercontent.com',
    REACT_APP_GOOGLE_CALENDAR_API_KEY: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY || 'AIzaSyD5dRd8kutvpShO1cYC5pfi6gsjlOokJpE',
    REACT_APP_STRIPE_PUBLIC_API_KEY: process.env.REACT_APP_STRIPE_PUBLIC_API_KEY || 'pk_test_51JEWhNDNEDWq2u3VAIbt0fRlYjERJia7fFrFrOwKKaQD0CvoCXisdwsP8SYfnethAG8vQP2piUeyREB4454vvoJx00Z1IWbJhd'
}

export default config