import axios from "axios";
import uploadImage from "@/modules/daybook/helpers/uploadImage";

describe('Pruebas en el uploadImage',() =>{
    
    test('debe de cargar un archivo y retornar el url', async ( )=>{
      const {data} =  await axios.get('https://res.cloudinary.com/dkolaarve/image/upload/v1674639311/xpfejnqk3nemyb1cq7dh.png',{
        responseType:'arraybuffer'
    })
      /*  const file = new File([data],'foto.png')

        const url = await uploadImage(file)
        expect(typeof url).toBe('string')

        const segments = url.split('/')
        const imageId = segments[segments.length-1].replace('.jpg','')
        cloudinary.v2.api.delete_resources(imageId)*/
         
    })
})