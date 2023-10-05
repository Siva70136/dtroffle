import { useState,useEffect } from "react";
import './index.css'



const Item = (props) => {
    const { id } = props.match.params;
    const [data, setData] = useState([])
    //console.log(id)

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            const data1 = await response.json();
            setData(data1);
            //console.log(data)


        } catch (error) {
            console.error('An error occurred:', error);
        }

    }

    return (
        <div className="item-container">
            <div className='items-container'>
                <div className="car">
                    <img src={data.thumbnail} alt={data.title} className='img' />
                    <table className='info'>
                        <tr>
                            <th>Title:</th>
                            <td>{data.title}</td>
                        </tr>
                        <tr>
                            <th>Description:</th>
                            <td>{data.description}</td>
                        </tr>
                        <tr>
                            <th>Price:</th>
                            <td>${data.price}</td>
                        </tr>
                        <tr>
                            <th>Category:</th>
                            <td>{data.category}</td>
                        </tr>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Item;