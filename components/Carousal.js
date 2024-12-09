export default function Carousal() {
    const buttonStyle = {
        color: 'white', 
        backgroundColor: '#50C878', // Emerald color
        borderColor: '#50C878' // Ensuring the border matches the background
    };

    return (
        <div>
            <div id="" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/images/anna-zagranichna-6XRAkSaYbrk-unsplash.jpg" className="d-block w-100" style={{ height: '50vh', width: '100%', objectFit: 'cover', filter: "brightness(30%)" }} alt="part" />
                        <div className="carousel-caption d-none d-md-block">
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit" style={buttonStyle}>Search</button>
                            </form>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/images/anna-zagranichna-wYoqZs3dDyw-unsplash.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/images/bennie-bates-j7l_GR9WeZE-unsplash.jpg" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}







