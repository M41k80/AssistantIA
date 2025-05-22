import axios from 'axios'

export const uploadToCloudinary = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'pictures') 
    formData.append('cloud_name', 'da4hl6oqc') 

    const res = await axios.post(
        'https://api.cloudinary.com/v1_1/da4hl6oqc/image/upload', 
        formData
    )
    return res.data.secure_url
}
