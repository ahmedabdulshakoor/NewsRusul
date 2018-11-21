import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import home from './Components/Home'
let _search ="ahmed";

class Home extends Component {
    constructor(){
        super();

        console.log("1 Home [inputValue] = " , _search);
        this.state = {
            news:[],
            inputValue: _search
        };
        console.log("2 Home [inputValue] = " ,  this.state.inputValue);
        this.render();
    }
    render(){
        return (
            <div id="contianer">
               {<p> search ----------- {this.state.inputValue}  ________ {_search}</p>}
                <Header />
                <NewsList ></NewsList>
            </div>
        )
    }
}

class Header extends Component{
    constructor(){
        super();
        this.state = {
            news:[],
            inputValue: ''
        };
    }

    onInputChange(e){
        this.setState({
            inputValue: e.target.value
        })
    }

    onInputKeyUp(e){
        if(e.keyCode === 13 ){
            let q = this.state.inputValue;
            console.log(q);
            _search = this.state.inputValue;
            var ff= new Home().render();
            var ff2 =ff;
            console.log("***********************************");
        }
    }

    render(){
        return(
            <header>
                <img src={require('./assets/logo.png')} alt="fikraspace logo"/>
                <input type="search" id="search"
                       value={this.state.inputValue}
                       onKeyUp={this.onInputKeyUp.bind(this)}
                       onChange={this.onInputChange.bind(this)}/>
            </header>
        )
    }
}

class NewsList extends Component{
    constructor(){
        super();
        
        this.state = {
            news:[],
            search_tirm: _search
        };

        this.getNews(this.state.search_tirm);
        console.log('NewsList[search_tirm] = ', this.state.search_tirm)
    }
    getNews(search_tirm){
        fetch(`https://newsapi.org/v2/everything?q=${search_tirm}&sortBy=publishedAt&apiKey=159ab043c8be4a0d9f4f385a853ef619`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                 this.setState({
                     news:data.articles
                 })
            })
    }
    render(){
        return(
            <main id="content">
                <div id="recent_links">
                    {
                        this.state.news.map((item, i)=>{
                            return <News item={item} key={i}/>
                        })
                    }
                </div>
            </main>
        )
    }
}

function News(props) {
    return(
        <article>
            <div>
                <img src={props.item.urlToImage} alt=""/>
            </div>
            <div id="info">
                <h3>{props.item.title}</h3>
                <p>{props.item.description}</p>
                <time>{props.item.publishedAt}</time>
            </div>
            <div id="voter">
                <i className="fas fa-sort-up"></i>
                <span>0</span>
                <i className="fas fa-sort-down"></i>
            </div>
        </article>
    )
}
// define a stateless components



ReactDOM.render( <Home />, document.getElementById('root'));