import React from 'react';
import axios from 'axios';
import './EdibleMushrooms.css';

class EdibleMushrooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mushrooms: [],
      loading: true,
      error: null,
      expandedMushroomId: null // Добавляем состояние для отслеживания раскрытого гриба
    };
  }

  componentDidMount() {
    axios.get('https://localhost:7199/SiedGrib')
      .then(response => {
        if (Array.isArray(response.data)) {
          this.setState({ mushrooms: response.data, loading: false });
        } else {
          console.error('Expected array but got:', typeof response.data, response.data);
          this.setState({ error: 'Invalid data format', loading: false });
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.setState({ error: error.message, loading: false });
      });
  }

  toggleExpand = (id) => {
    this.setState(prevState => ({
      expandedMushroomId: prevState.expandedMushroomId === id ? null : id
    }));
  };

  render() {
    const { mushrooms, loading, error, expandedMushroomId } = this.state;

    if (loading) {
      return <div className='EdibleMushrooms'>Loading...</div>;
    }

    if (error) {
      return <div className='EdibleMushrooms'>Error: {error}</div>;
    }

    return (
      <div className='EdibleMushrooms'>
        <h1>Съедобные грибы</h1>
        <div className='mushroom-list'>
          {mushrooms.map(mushroom => (
            <div 
              key={mushroom.id} 
              className={`mushroom-item ${expandedMushroomId === mushroom.id ? 'expanded' : ''}`}
              onClick={() => this.toggleExpand(mushroom.id)}
            >
              <h2>{mushroom.name}</h2>
              
              {mushroom.img && (
                <img
                  src={`https://localhost:7199/Images/${mushroom.img}.jpg`}
                  alt={mushroom.name}
                  className='mushroom-image'
                />
              )}
              <p className='mushroom-discripsion'>{mushroom.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default EdibleMushrooms;

