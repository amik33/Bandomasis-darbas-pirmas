import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { Forbiden } from "../../components/error/Forbiden";
import { Title } from "../../components/Title";
import defaultImage from '../../assets/preview.png';

export function EditForm() {
    const navigate = useNavigate();
    const { formId } = useParams();
    const currentYear = new Date().getFullYear();
    const { role, totale, steeringWheelSides } = useContext(GlobalContext);

    const [form, setForm] = useState(null);
    const [image, setImage] = useState('');
    const [imageErr, setImageErr] = useState('');
    const [title, setTitle] = useState('');
    const [titleErr, setTitleErr] = useState('');
    const [price, setPrice] = useState(0);
    const [priceErr, setPriceErr] = useState('');
    const [color, setColor] = useState('');
    const [colorErr, setColorErr] = useState('');
    const [total, setTotal] = useState('');
    const [totalErr, setTotalErr] = useState('');
    const [year, setYear] = useState(currentYear);
    const [yearErr, setYearErr] = useState('');
    const [steeringWheel, setSteeringWheel] = useState('');
    const [steeringWheelErr, setSteeringWheelErr] = useState('');
    const [location, setLocation] = useState('');
    const [locationErr, setLocationErr] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/api/forms/' + formId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setForm(data.form);
                    const form = data.form;
                    setImage(form.image);
                    setTitle(form.title);
                    setPrice(form.price);
                    setColor(form.color);
                    setTotal(form.total);
                    setYear(form.year);
                    setSteeringWheel(form.steeringWheel);
                    setLocation(form.location);
                }
            })
            .catch(console.error);
    }, []);

    if (role !== 'user') {
        return <Forbiden />;
    }

    function updateImage(e) {
        const formData = new FormData();
        formData.append('form_image', e.target.files[0]);

        fetch('http://localhost:3001/api/upload/form', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => setImage(`http://localhost:3001/${data.path}`))
            .catch(err => console.error(err));
    }

    function imageValidity() {
        if (image === '') {
            return 'Reikalinga nuotrauka.';
        }

        return '';
    }

    function titleValidity() {
        const maxSize = 100;

        if (title === '') {
            return 'Reikalingas pavadinimas.';
        }

        if (title.length > maxSize) {
            return `Per ilgas pavadinimas. Max leidziama ${maxSize} simboliai.`;
        }

        return '';
    }

    function priceValidity() {
        const min = 0;
        const max = 1_000_000;

        if (price < min) {
            return `Kaina negali buti mazesne uz ${min}.`;
        }

        if (price > max) {
            return `Kaina negali buti didesne uz ${max}.`;
        }

        return '';
    }

    function colorValidity() {
        const maxSize = 20;

        if (color === '') {
            return 'Reikalinga spalva.';
        }

        if (color.length > maxSize) {
            return `Spalvos pavadinimas negali virsyti ${maxSize} simbliu.`;
        }

        return '';
    }

    function totalValidity() {
        if (!totale.includes(total)) {
            return 'Reikia nurodyti kebulo tipa.';
        }

        return '';
    }

    function yearValidity() {
        const min = 1886;
        const max = new Date().getFullYear();

        if (year < min || year > max) {
            return 'Negali nurodyti metu, kuriai nebuvo gaminami automobiliai.';
        }

        return '';
    }

    function steeringWheelValidity() {
        if (!steeringWheelSides.includes(steeringWheel)) {
            return 'Reikia nurodyti kurioje puseje yra vairas, jei jis yra.';
        }

        return '';
    }

    function locationValidity() {
        const maxSize = 100;

        if (location === '') {
            return 'Reikia nurodyti vietove.';
        }

        if (location.length > maxSize) {
            return `Per ilgas vietoves pavadinimas. Max leidziama ${maxSize} simboliai.`;
        }

        return '';
    }

    function isValidForm() {
        const imageMsg = imageValidity();
        setImageErr(imageMsg);

        const titleMsg = titleValidity();
        setTitleErr(titleMsg);

        const priceMsg = priceValidity();
        setPriceErr(priceMsg);

        const colorMsg = colorValidity();
        setColorErr(colorMsg);

        const totalMsg = totalValidity();
        setTotalErr(totalMsg);

        const yearMsg = yearValidity();
        setYearErr(yearMsg);

        const steeringWheelMsg = steeringWheelValidity();
        setSteeringWheelErr(steeringWheelMsg);

        const locationMsg = locationValidity();
        setLocationErr(locationMsg);

        return !imageMsg && !titleMsg && !priceMsg && !colorMsg && !totalMsg
            && !yearMsg && !steeringWheelMsg && !locationMsg;
    }

    function submitHandler(e) {
        e.preventDefault();

        if (!isValidForm()) {
            return;
        }

        fetch('http://localhost:3001/api/forms/' + formId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                image, title, price, color, total,
                year, steeringWheel, location
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    navigate('/forms');
                }
            })
            .catch(console.error);
    }

    const defaultImageStyle = {
        height: 300,
        objectFit: 'cover',
        objectPosition: 'center',
        border: '1px solid #ccc',
    };
    const imageStyle = {
        height: 300,
        objectFit: 'contain',
        objectPosition: 'center',
        border: '1px solid #ccc',
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title="Edit form" />
                </div>
                <form onSubmit={submitHandler} className="col-12 col-sm-8">
                    <div className="row mb-3">
                        <img src={image ? image : defaultImage} alt="Form" className="col-12 p-0 mb-3"
                            style={image ? imageStyle : defaultImageStyle} />
                        <label className="col-12 col-md-4 form-label" htmlFor="image">Image</label>
                        <div className="col-12 col-md-8">
                            <input onChange={updateImage} type="file"
                                className={`form-control ${imageErr ? 'is-invalid' : ''}`} id="image" />
                            <div className="invalid-feedback">{imageErr}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="title">Title</label>
                        <div className="col-12 col-md-8">
                            <input onChange={e => setTitle(e.target.value)} value={title} type="text"
                                className={`form-control ${titleErr ? 'is-invalid' : ''}`} id="title" />
                            <div className="invalid-feedback">{titleErr}</div>
                            <small className="text-body-secondary">Title</small>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="price">Price</label>
                        <div className="col-12 col-md-8">
                            <div className="input-group">
                                <input onChange={e => setPrice(+e.target.value)} value={price} type="number"
                                    className={`form-control ${priceErr ? 'is-invalid' : ''}`} id="price" min={0} max={1_000_000} step={1} />
                                <span className="input-group-text">EUR</span>
                                <div className="invalid-feedback">{priceErr}</div>
                            </div>
                            <small className="text-body-secondary">Price</small>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="color">Color</label>
                        <div className="col-12 col-md-8">
                            <input onChange={e => setColor(e.target.value)} value={color} type="text"
                                className={`form-control ${colorErr ? 'is-invalid' : ''}`} id="color" />
                            <div className="invalid-feedback">{colorErr}</div>
                            <small className="text-body-secondary">Color</small>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="total">Type</label>
                        <div className="col-12 col-md-8">
                            <select className={`form-select ${totalErr ? 'is-invalid' : ''}`}
                                onChange={e => setTotal(e.target.value)} value={total} id="total">
                                <option value="None">- Select</option>
                                {totale.map(tot =>
                                    <option key={tot} value={tot}>{tot}</option>
                                )}
                            </select>
                            <div className="invalid-feedback">{totalErr}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="year">Year</label>
                        <div className="col-12 col-md-8">
                            <input onChange={e => setYear(e.target.value)} value={year} type="number"
                                className={`form-control ${yearErr ? 'is-invalid' : ''}`} id="year" min={1886} max={currentYear} step={1} />
                            <div className="invalid-feedback">{yearErr}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="steeringWheel">Steering wheel</label>
                        <div className="col-12 col-md-8">
                            <select className={`form-select ${steeringWheelErr ? 'is-invalid' : ''}`} onChange={e => setSteeringWheel(e.target.value)}
                                value={steeringWheel} id="steeringWheel">
                                <option value="None">- Select</option>
                                {steeringWheelSides.map(tot =>
                                    <option key={tot} value={tot}>{tot}</option>
                                )}
                            </select>
                            <div className="invalid-feedback">{steeringWheelErr}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="location">Location</label>
                        <div className="col-12 col-md-8">
                            <div className="input-group">
                                <input onChange={e => setLocation(e.target.value)} value={location} type="text"
                                    className={`form-control ${locationErr ? 'is-invalid' : ''}`} id="location" />
                                <div className="invalid-feedback">{locationErr}</div>
                            </div>
                            <small className="text-body-secondary">City</small>
                        </div>
                    </div>
                    <hr />
                    <button className="btn btn-primary py-2" type="submit">Update</button>
                </form>
            </div>
        </div>
    )
}