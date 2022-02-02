import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form } from 'react-bootstrap'
import app from '../../firebase/firebase.js'
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react'

const Home = ({user}) => {
    const [image, setImage] = useState(null);
    const [urls, setUrls] = useState([])
    const endsWithListItem = (str, li) => {
        for (let i = 0; i < li.length; i++){
            if (str.endsWith(li[i])){
                return true
            }
        }
        return false
    }
    const handleChange = (e) => {
        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = async () => {
        if (!image.type.startsWith('image/')){return}
        const storage = await getStorage()
        const storageRef = await ref(storage, `/images/${image?.name}`)
        await uploadBytes(storageRef, image)
        const url = await getDownloadURL(ref(storage, `images/${image?.name}`))
        setUrls((prev) => [url, ...prev])

    }
    const loadImages = () => {
        const storage = getStorage()
        const listRef = ref(storage, '/images')

        listAll(listRef).then((res) => {

            res.items.forEach( async (item) => {
                if (!endsWithListItem(item._location.path, ['png', 'jpg', 'gif'])){return}
                const url = await getDownloadURL(ref(storage, item._location.path));
                await setUrls((prev) => {
                    if (prev.indexOf(url) === -1){
                        return [...prev, url]
                    }else{
                        return [...prev]
                    }
                })
            });
        })
    }
    useEffect(() => {loadImages()}, [])






    return (
        <>
            <div className='homePage'>
                <h1>The site is loaded. You can now edit the home page or add other components</h1>
                {user?<h2 style={{textAlign: 'center'}}>Welcome, {user}</h2>:null}
                <Form.Group controlId="formFileLg" className="mb-3">
                    <Form.Label>Upload a photo</Form.Label>
                    <Form.Control type="file" size="lg" onChange={handleChange}/>
                </Form.Group>
                <Button onClick={handleUpload}>Upload Image</Button>{' '}
                <div className='photosDiv'>
                    {urls.map((url) => <img src={url}></img>)}
                </div>

            </div>
        </>
    )
}

export default Home
