
export default function Card(props) {
    const {bookTitle, bookImageUrl} = props;

    return (
        <div className="card">
            <img src="https://picsum.photos/200" className="bd-img card-img-top" alt="book image"/>
            <div className="card-body">
                <h5 className="card-title">{bookTitle}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    )
}