//импортируем необходимые файлы
import React from 'react';
import './AutorProdjectCSS/AutorProdject.css';
import axios from 'axios';

    const src = "https://localhost:7221/AutorsProdject";
    
class AutorsProdjectText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    componentDidMount() {
        axios.get(src)
      .then(res => {
        const box = res.data;
        this.setState({ box });
      })    
    }
    render() {
        return (
            <div className='AutorsProdjectText'>
                <p className='AutorsProdjectTextP' >
                    О авторах
                </p>
                <div>
                <div>Мы делали делали делали и что-то да сделали.</div>
                <br />
                <div>В разработке учавствовали:</div>
                <div>2. Семенов Евгений </div> 
                </div>
            </div>
        )
    }
}
export default AutorsProdjectText