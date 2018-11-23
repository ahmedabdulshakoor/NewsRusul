
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
var _ = require("underscore")

let NewsDB = [];
let NewsFromData = [];
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




    getNews(search_tirm) {
        fetch(`https://newsapi.org/v2/everything?q=${search_tirm}&sortBy=publishedAt&apiKey=159ab043c8be4a0d9f4f385a853ef619`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);

                NewsDB = JSON.parse(localStorage.getItem('NewsDB')) || []
                var i;
                for (i = 0; i < data.articles.length; i++) {
                    data.articles[i].value = 0;
                    let k = 0;
                    let found = true;
                    while (k < NewsDB.length && found && NewsDB.length > 0) {
                        if (NewsDB[k].url === data.articles[i].url) {
                            found = false;
                            data.articles[i].value = NewsDB[k].Count;
                        }
                        k++;
                    }
                }

                NewsFromData = data.articles;
                console.log("{ > data.articles } >", data.articles);
                // console.log("{ > data.articles } >", _.sortBy(data.articles, 'author'));

                this.setState({
                    items: data.articles
                })

            })



    }
    onInputKeyUp(e) {
        if (e.keyCode === 13) {
            let q = this.state.inputValue;
            console.log(q);
            this.getNews(q);
            NewsFromData = this.state.items;
            console.log(this.state.items);
            console.log("***********************************");
        }
    }
    onInputChangeList(e) {
        console.log(e.target.value);
        console.log(NewsFromData);
        switch (e.target.value) {
            case "Title":
                this.setState({
                    items: _.sortBy(NewsFromData, 'title')
                })
                break;
            case "Date":
                this.setState({
                    items: _.sortBy(NewsFromData, 'publishedAt')
                })
                break;
            case "Votes":
                NewsDB = JSON.parse(localStorage.getItem('NewsDB')) || []
                var i;
                NewsFromData = this.state.items;

                for (i = 0; i < NewsFromData.length; i++) {
                    NewsFromData[i].value = 0;
                    let k = 0;
                    let found = true;
                    while (k < NewsDB.length && found && NewsDB.length > 0) {
                        if (NewsDB[k].url === NewsFromData[i].url) {
                            found = false;
                            NewsFromData[i].value = NewsDB[k].Count;
                        }
                        k++;
                    }
                }
                console.log(_.sortBy(NewsFromData, 'value'));
                this.setState({
                    items: _.sortBy(NewsFromData, 'value').reverse()
                })
                break;
            default:
                this.setState({
                    items: NewsFromData
                })
        }
    }

    onInputChangeListNumber(e) {
        console.log(e.target.value);
        console.log(NewsFromData);
        switch (e.target.value) {
            case "5":
                this.setState({

                    items: NewsFromData.slice(0, 5)
                })
                break;
            case "10":
            this.setState({

                items: NewsFromData.slice(0, 10)
            })
                break;
          default:
                this.setState({
                    items: NewsFromData
                })
        }
    }


    render() {
        return (
            <div id="contianer">
                <header>
                    <img src={require('./assets/logo.png')} alt="fikraspace logo" />
                    <select name="SortBy"
                        onChange={this.onInputChangeList.bind(this)}>
                        <option value="Default">Default</option>
                        <option value="Title">Title</option>
                        <option value="Date">Date</option>
                        <option value="Votes">Votes</option>
                    </select>
                    <select name="Showme"
                        onChange={this.onInputChangeListNumber.bind(this)}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20" select="selected">20</option>
                    </select>



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


    onClickUP(e) {

        let alte = e.target.alt;
        console.log(alte);
        let Count = e.target.parentNode.children[1].innerHTML;
        Count++;
        e.target.parentNode.children[1].innerHTML = Count;
        console.log(Count);
        // localStorage.clear();
        NewsDB = JSON.parse(localStorage.getItem('NewsDB')) || []
        //console.log("Befour ", NewsDB);
        let k = 0;
        //console.log(k);
        let found = true;
        //console.log(NewsDB.length);
        while (k < NewsDB.length && found && NewsDB.length > 0) {
            if (NewsDB[k].url === alte) {
                found = false;
                //console.log("Found");
                NewsDB[k].Count = Count
            }
            k++;
        }

        if (found === true) {

            console.log(">ADD<");
            NewsDB.push({
                url: alte,
                Count: Count
            })
        }
        localStorage.setItem('NewsDB', JSON.stringify(NewsDB))
    }

    onClickDown(e) {
        let alte = e.target.alt;
        console.log(alte);
        let Count = e.target.parentNode.children[1].innerHTML;
        Count--;
        e.target.parentNode.children[1].innerHTML = Count;
        console.log(Count);
        // localStorage.clear();
        NewsDB = JSON.parse(localStorage.getItem('NewsDB')) || []
        console.log("Befour ", NewsDB);
        let k = 0;
        console.log(k);
        let found = true;
        console.log(NewsDB.length);
        while (k < NewsDB.length && found && NewsDB.length > 0) {
            if (NewsDB[k].url === alte) {
                found = false;
                console.log("Found");
                NewsDB[k].Count = Count;
            }
            k++;
        }

        if (found === true) {

            console.log(">ADD<");
            NewsDB.push({
                url: alte,
                Count: Count
            })
        }
        localStorage.setItem('NewsDB', JSON.stringify(NewsDB))
    }


    render() {
        return (
            <main id="content">
                <div id="recent_links">

                    {
                        this.props.items.map((item, i) => (

                            <article key={i} id={i}>
                                <div >
                                    <img height="130px" width="130px" src={item.urlToImage} alt={item.url} />
                                </div>
                                <div id="info">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <time>{item.publishedAt}</time>
                                </div>
                                <div id="voter">
                                    <img height="20px" width="20px" src={require('./assets/upvote.svg')} alt={item.url}
                                        onClick={this.onClickUP.bind(this)} />

                                    <div >{item.value}</div>
                                    <img height="20px" width="20px" src={require('./assets/downvote.svg')} alt={item.url}
                                        onClick={this.onClickDown.bind(this)} />
                                </div>
                            </article>
                        ))}


                </div>
            </main>

        )
    }
}

ReactDOM.render(<NewsApp />, document.getElementById('root'));