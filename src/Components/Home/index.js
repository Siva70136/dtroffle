import { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from 'js-cookie'
import './index.css'

const Home = (props) => {
    let d;
    const [data, setData] = useState([]);
    const [category, setCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        id: "",
        title: '',
        price: '',
        category: '',
        description: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const { history } = props
    //============== Logout  ==============
    const logout = async () => {
        Cookies.remove("jwt_token");
        history.replace("/login");
    }
    //============== Register & Update ===============
    const register = async (e) => {
        e.preventDefault();
        //console.log(formData);
        const itemIndex = data.findIndex((item) => item.id == formData.id);
        console.log(data[30]);
        const newItem = {
            ...formData
        }
        if (itemIndex === -1) {

            //console.log(newItem);
            setData([...data, newItem])
            const store = JSON.stringify(data);
            localStorage.setItem('data', store);
        }
        else {
            const updatedData = [...data];
            updatedData[itemIndex] = newItem;
            setData(updatedData);
            //console.log(data[itemIndex])

        }

    }

    //============== Get ===================
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products`);
            const data1 = await response.json();
            const UpdatedData = data1.products.map(each => ({
                id: each.id,
                title: each.title,
                description: each.description,
                thumbnail: each.thumbnail,
                price: each.price,
                category: each.category
            }))
            // console.log(UpdatedData);
            setData(UpdatedData);
            d = localStorage.getItem('data');
            //console.log(d)
            setData(JSON.parse(d))
            //console.log(data)

        } catch (error) {
            console.error('An error occurred:', error);
        }

    }
    const getData1 = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${category}`);
            const data1 = await response.json();
            const UpdatedData = data1.products.map(each => ({
                id: each.id,
                title: each.title,
                description: each.description,
                thumbnail: each.thumbnail,
                price: each.price,
                category: each.category
            }))
            //console.log(UpdatedData);
            setData(UpdatedData);

        } catch (error) {
            console.error('An error occurred:', error);
        }

    }



    //=============  Pagination  ================

    const itemsPerPage = 3;

     if (data != []) {
        const totalPages = Math.ceil(data.length / itemsPerPage);
    }

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = data.slice(startIndex, endIndex);

    //=============== Delete =============
    const del = (id) => {
        const updatedData = data.filter((card) => card.id !== id);
        setData(updatedData);
    }









    return (
        <div className="main-containe ">

            <div className="app-containe">

                <div className='nav-container'>

                    <div className="navbar">
                        <div className='search-container'>

                            <input
                                type="text"
                                onChange={e => setCategory(e.target.value)}
                                placeholder="Search"
                                className='input1'
                            />
                            <button className='search' onClick={getData1}><BsSearch /></button>
                        </div>
                        <div>
                            <button className="button btn" onClick={logout}>Logout</button>
                        </div>

                    </div>

                </div>
                <div className='edit-container'>
                    <div className="create-container">
                        <div className="main-container">
                            <div className="app-container">

                                <form className="form">
                                    <h2 className="textHead">Add The Product</h2>
                                    <p className="left">Id:</p>
                                    <input
                                        type="text"
                                        name="id"
                                        value={formData.id}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                    <p className="left">Title:</p>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="input"
                                    />


                                    <p className="left">Price:</p>
                                    <input
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                    <p className="left">Category:</p>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="input"
                                    />


                                    <p className="left">Description:</p>
                                    <input
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="input"
                                    />



                                    <div className="button-container">
                                        <button type="submit" className="button btn" onClick={register}>Submit</button>
                                        
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='items-container'>

                    {itemsToDisplay.map((each, index) => {

                        return (
                            <div className="car" key={index}>
                                <Link to={`${each.id}`} className="link">
                                    <img src={each.thumbnail} alt={each.title} className='img' />
                                </Link>
                                <table className='info'>
                                    <tbody>
                                    <tr>
                                        <th>Title:</th>
                                        <td>{each.title}</td>
                                    </tr>
                                    <tr>
                                        <th>Description:</th>
                                        <td>{each.description}</td>
                                    </tr>
                                    <tr>
                                        <th>Price:</th>
                                        <td>${each.price}</td>
                                    </tr>
                                    <tr>
                                        <th>Category:</th>
                                        <td>{each.category}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className='delete'>
                                    <button className='nav' onClick={() => del(each.id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                    }

                </div>
                <div className="pagination">
                    <button className="nav" onClick={goToPreviousPage}>Previous</button>
                    <span className='page'>Page {currentPage} of {totalPages}</span>
                    <button onClick={goToNextPage} className="nav">Next</button>
                </div>
            </div>




        </div>

    )

}


export default Home;
