import Post from "../Post/Post";
import React, {useState, useEffect} from "react";

function Home() {                                                    //React'da her bir objenin bir state'i olur.
    const [error, setError] = useState(null);                        //İlk durumda Error nulldur.
    const [isLoaded, setIsLoaded] = useState(false);                 //Data'nın gelip gelmediği kontrol edilir. İlk durumda data yoktur.
    const [postList, setPostList] = useState([]);                    //Data çekmediğimizde ilk durumda boş liste olur.
    
    useEffect(() => {
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

            }
        )
    }, [])

    if(error) {                                                         //Error varsa ekrand Error!!! yazar.
        return <div> Error!!! </div>
    } else if(!isLoaded) {                                              //Error yoksa henüz data yüklenmediyse Loading... yazar.
        <div> Loading... </div>
    } else {                                                            //Error yok, dosya başarıyla yüklendiyse
        return(
            <div className="container">
            Home!!!
            
            {postList.map(post => (
                <Post title={post.title} text={post.text}></Post>       //Home parent Post child oluyor. Burada oluşturduğumuz propsları Postta almamız gerekiyor.
            ))}
            </div>    
        );
    }
}

export default Home;