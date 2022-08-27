import { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { InputGroup, Input, Button, Spinner } from "reactstrap";
import BookCard from "./BookCard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  // handle Search
  const handleSubmit = () => {
    setLoading(true)
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((res) => {
        console.log(res);
        setCards(res.data.items);
        setLoading(false);
      })
      .catch(err => {
        setLoading(true);
        console.log(err);
      })
  };
  console.log(cards);


  const mainHeader = () => {
    return (
      <div className="main d-flex justify-content-center align-itam-center">
        <div>
          <h1 className="display-4 text-center mb3">Google Books</h1>
          <div style={{ width: "60%", zIndex: 2 }}>
            <InputGroup>
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              ></Input>
            </InputGroup>
            <Button color="secondary" onClick={handleSubmit}><i><FaSearch /></i></Button>
          </div>
        </div>
      </div>
    )
  }



  const handleCards = () => {
    if (loading) {
      return (
        <div className="d-flex justify-content-cemter">
          <Spinner style={{ width: "3rem", height: "3rem" }} />
        </div>
      )
    } else {
      const items = cards.map((item, i) => {
        let thumbnail = "";
        if (item.volumeInfo.imageLinks) {
          thumbnail = item.volumeInfo.imageLinks.thumbnail;
        }
        return (
          <div className="col-4 my-2" key={i}>
            <BookCard
              thumbnail={thumbnail}
              title={item.volumeInfo.title}
              pageCount={item.volumeInfo.pageCount}
              description={item.volumeInfo.description}
              authors={item.volumeInfo.authors}
            />
          </div>
        )
      })


      return (
        <div className="container my-5">
          <div className="row">
            {items}
          </div>
        </div>
      )

    }
  }




  return (
    <div className="w-100 h-100">
      {mainHeader()}
      {handleCards()}

    </div>

  );
}

export default App;
