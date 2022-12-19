import Post from "../Post/Post";
import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PostForm from "../Post/PostForm";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent : "center",
        alignItems : "center",
        backgroundColor: '#f0f5ff', 
    }
}));

function Home() {                                                    //React'da her bir objenin bir state'i olur.
    const [error, setError] = useState(null);                        //İlk durumda Error nulldur.
    const [isLoaded, setIsLoaded] = useState(false);                 //Data'nın gelip gelmediği kontrol edilir. İlk durumda data yoktur.
    const [postList, setPostList] = useState([]);                    //Data çekmediğimizde ilk durumda boş liste olur.
    const classes = useStyles();

    const refreshPosts = () => {
        fetch("/posts")                                              //Backend'de ayağa kalkan host ve Controller'de postun map adresi yazılır. Host adresini package.json dosyasına proxy olarak ekledik. Fetch yapıldığında otomatik olarak başına ekler.
        .then(response => response.json())                           // Gelen response'u json'a pars eder.
        .then(
            (result) => {                                            //Result geldiğinde içindeki kodları yap.
                setIsLoaded(true);                                   //Data geldi.
                setPostList(result);

            },
            (error) => {                                             //Error geldiğinde içindeki kodları yap.
                setIsLoaded(true);                                   //Error geldiğinde yine true yapılır. Sonuçta error da olsa kodumuz tamamlanmış ve bir sonuç dönmüş oldu.
                setError(error);                                     //Error geldi.
                console.log(error); 
            }
        )
    }


    useEffect(() => {
      refreshPosts()
    }, [])

    if(error) {                                                         //Error varsa ekrand Error!!! yazar.
        return <div> Error!!! </div>
    } else if(!isLoaded) {                                              //Error yoksa henüz data yüklenmediyse Loading... yazar.
        <div> Loading... </div>
    } else {                                                            //Error yok, dosya başarıyla yüklendiyse
        return(
            <div className = {classes.container}>
                <ul>
                    <PostForm userId = {1} userName = {"username"} refreshPosts = {refreshPosts}></PostForm>
                    {postList.map(post => (
                    <Post likes = {post.postLikes} postId = {post.id} userId = {post.userId} userName = {post.userName}  
                    title={post.title} text={post.text} ></Post>  //Home parent Post child oluyor. Burada oluşturduğumuz propsları Postta almamız gerekiyor.
                ))}
                </ul>
            </div>
            
        );
    }
}

export default Home;