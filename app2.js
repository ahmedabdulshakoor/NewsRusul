
import React, {Component} from 'react'
import ReactDOM from 'react-dom'



class NewsApp extends React.Component {
    constructor() {
        super();
        this.state = { items: [], inputValue: 'Iraq' };
        this.getNews(this.state.inputValue);
    }

    onInputChange(e) {
        this.setState({
            inputValue: e.target.value
        })
    }
    getNews(search_tirm){
        fetch(`https://newsapi.org/v2/everything?q=${search_tirm}&sortBy=publishedAt&apiKey=159ab043c8be4a0d9f4f385a853ef619`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                 this.setState({
                    items:data.articles
                 })
            })
    }
    onInputKeyUp(e) {
        if (e.keyCode === 13) {
            let q = this.state.inputValue;
            console.log(q);
            this.getNews(q);
            console.log("***********************************");
        }
    }
    render() {
        return (
            <div id="contianer">
                <header>
                    <img src={require('./assets/logo.png')} alt="fikraspace logo" />
                    <input type="search" id="search"
                        value={this.state.inputValue}
                        onKeyUp={this.onInputKeyUp.bind(this)}
                        onChange={this.onInputChange.bind(this)} />
                </header>
                <NewsList items={this.state.items} />
            </div>

        );
    }
}

class NewsList extends React.Component {
    constructor(props) {
        super(props);
        console.log("***----",props);
    }
    render() {
        return (
            <main id="content">
            <div id="recent_links">
 
            { this.props.items.map((item,i) => (
                
                <article key={i}>
                    <div>
                        <img src={item.urlToImage} alt="" />
                    </div>
                    <div id="info">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <time>{item.publishedAt}</time>
                    </div>
                    <div id="voter">
                        <i className="fas fa-sort-up"></i>
                        <span>0</span>
                        <i className="fas fa-sort-down"></i>
                    </div>
                </article>
            ))}
          
                   
                </div>
            </main>
 
        )
    }
}

ReactDOM.render(<NewsApp />, document.getElementById('root'));