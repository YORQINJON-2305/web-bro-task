import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import "./client.css";
import axios from "axios";

export const Client = () => {
  const [data, setData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [singleCategory, setSingleCategory] = useState("");
  const [cart, setCart] = useState([]);

  const fetchData = async pagination => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products?limit=20&skip=${pagination}`
      );
      if (res.status === 200) {
        setData(res.data.products);
        setTotalItem(res.data.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(pagination);
  }, [pagination]);

  const handleAllCategory = () => {
    fetchData(pagination);
    setSingleCategory("");
  };

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/category/${singleCategory}`)
      .then(res => {
        setData(res.data.products);
      })
      .catch(err => console.log(err));
  }, [singleCategory]);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/categories`)
      .then(res => {
        setCategoriesData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const addToCart = item => {
    setCart([...cart, item]);
  };

  const removeFromCart = productId => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  return (
    <>
      <Header />
      <div className="my-container">
        <div className="filter-wrap">
          <select
            className="form-select me-3"
            value={singleCategory}
            onChange={evt => setSingleCategory(evt.target.value)}>
            <option value="">Choose Category</option>
            {categoriesData?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button
            className={
              singleCategory === ""
                ? "btn btn-secondary disabled"
                : "btn btn-primary"
            }
            onClick={handleAllCategory}>
            All
          </button>
        </div>
        <ul className="card-list">
          {data?.map(item => (
            <li className="card-item" key={item.id}>
              <img className="card-img" src={item.thumbnail} alt={item.title} />
              <div className="card-info">
                <div className="card-text-info">
                  <strong className="card-title">{item.title}</strong>
                  <p className="card-descr">{item.description}</p>
                  <p className="card-price">
                    <strong>Price:</strong> {item.price}$
                  </p>
                  <p className="card-brand-name">
                    <strong>Brand:</strong> {item.brand}
                  </p>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(item)}>
                  Add to card
                </button>
              </div>
            </li>
          ))}
        </ul>
        {data.length <= 10 ? (
          ""
        ) : (
          <div className="pagination-wrap">
            <button
              className={
                pagination === 0
                  ? "btn btn-secondary disabled"
                  : "btn btn-primary"
              }
              onClick={() =>
                setPagination(pagination === 0 ? pagination : pagination - 20)
              }>
              Prev
            </button>
            <button
              className={
                pagination === totalItem - 20
                  ? "btn btn-secondary disabled"
                  : "btn btn-primary"
              }
              onClick={() => setPagination(pagination + 20)}>
              Next
            </button>
          </div>
        )}
      </div>

      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasTopLabel">
            Your cart
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          {cart.length > 0 ? (
            <ul className="cart-list">
              {cart.map(item => (
                <li className="card-item" key={item.id}>
                  <img
                    className="card-img"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                  <div className="card-info">
                    <div className="card-text-info">
                      <strong className="card-title">{item.title}</strong>
                      <p className="card-descr">{item.description}</p>
                      <p className="card-price">
                        <strong>Price:</strong> {item.price}$
                      </p>
                      <p className="card-brand-name">
                        <strong>Brand:</strong> {item.brand}
                      </p>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            "You have not added a product yet"
          )}
        </div>
      </div>
    </>
  );
};
