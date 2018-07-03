import axios from 'axios';
export const getData = (params)=>{
    const url = `http://www.baidu.com`;
    axios.get(url).then((data)=>{

    }).catch((e)=>{
        console.log('error')
    });
}
