import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form } from 'react-bootstrap'
import app from '../../firebase/firebase.js'
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react'

const Home = ({user}) => {
    const imageFileTypes = ['png', 'jpg', 'gif']
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

    const handleUpload = () => {
        const storage = getStorage()
        const storageRef = ref(storage, `/images/${image?.name}`)
        uploadBytes(storageRef, image).then(e => {console.log('uploaded', e)})
        loadImages()

    }
    const loadImages = () => {
        console.log('loading')
        const storage = getStorage()
        const listRef = ref(storage, '/images')

        listAll(listRef).then((res) => {

            res.items.forEach( async (item) => {
                console.log(item)
                if (!endsWithListItem(item._location.path, ['png', 'jpg', 'gif'])){return}
                const url = await getDownloadURL(ref(storage, item._location.path));
                await setUrls((prev) => {
                    if (prev.indexOf(url) === -1){
                        return [...prev, url]
                    }else{
                        return [...prev]
                    }
                })
                await console.log(url)
            });
        })
    }
    useEffect(() => {loadImages()}, [])






    return (
        <>
            <div className='homePage'>
                <h1>The site is loaded. You can now edit the home page or add other components</h1>
                {user?<h2 style={{textAlign: 'center'}}>Welcome, {user}</h2>:null}
                <input type="file" onChange={handleChange}/>
                <Button onClick={handleUpload}>Upload Image</Button>{' '}
                {/* <Button onClick={getFiles}>Get Files</Button> */}
                {urls.map((url) => <img src={url}></img>)}

            </div>
        </>
    )
}

export default Home
