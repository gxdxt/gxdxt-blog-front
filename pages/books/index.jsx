import { API_HOST } from "../../common"
import { marked } from "marked"
import { useState, useEffect } from "react"
import { styled } from '@emotion/styled'

const BooksPage = ({ booksData }) => {
    console.log(booksData);
    const [logo, setLogo] = useState('gxdxt.png');
    const [theme, setTheme] = useState('🌚')
    const changeColor = e => {
        if (document.querySelector('body').dataset.theme === 'light') {
            delete document.querySelector('body').dataset.theme
            setLogo('gxdxt.png');
            setTheme('🌚');
            window.localStorage.setItem('theme', JSON.stringify('dark'));
        } else {
            document.querySelector('body').dataset.theme = 'light' 
            setLogo('gxdxt_light.png');
            setTheme('🌝');
            window.localStorage.setItem('theme', JSON.stringify('light'));
        }
    }
      useEffect(() => {
        if (window.localStorage.getItem('theme') == "\"light\"") {
            console.log('light 모드로 진입');
            document.querySelector('body').dataset.theme = 'light'
            setLogo('gxdxt_light.png');
            setTheme('🌝');
        } else {
            console.log('dark 모드로 진입');  
            delete document.querySelector('body').dataset.theme
            setLogo('gxdxt.png');
            setTheme('🌚');
        }
      
      }, []);
    const Header = () => {
        return (
            <div className = "header">
                <div className = "header-logo-div">
                <img className = "header-logo" src={logo} onClick = {() => {
                  window.location.href = "/"
                }}></img>
                <div className="theme-div">
                 <a className="theme-btn" onClick={changeColor}>{theme}</a> 
                 </div>
                </div>
            </div>
        )
    }

    const Content = () => {
        return (
            <div className="book-list-div">
                {
                    booksData.map((book) => (
                        <li>
                            <img src={book.image}></img>
                            <div>{book.title}</div>
                            <div className="tag-div">
                                {
                                    book.tags.map((tag,index)=> (
                                    <span key={index} className="tag-li">
                                        #{tag}
                                    </span>
                                    ))
                                }
                            </div>
                            <span>{book.now}/{book.pages}</span>
                            <div>{book.start} - {book.end}</div>
                        </li>
                    ))
                }
            </div>
        )
    }
    return (
        <main>
            <title>Books</title>
            <Header></Header>
            <Content></Content>
        </main>
    )
}

export const getServerSideProps = async () => {
    const res = await fetch(`${API_HOST}/books`);
    const booksData = await res.json();
    return {
        props: {
            booksData
        }
    }
}

export default BooksPage