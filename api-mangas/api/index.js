import _mangas from 'jikan-node'

const mangas = new _mangas()

mangas.findAnime('1', 'episodes',1)
    .then(info => console.log(info))
    .catch(err => console.log(err));

/*mangas.search('anime','naruto')
    .then(info => console.log(info))
    .catch(err => console.log(err));*/
    
export default {
    getFindAnime : (req, res) => {
        mangas.findAnime('1', 'episodes',1, (error, info) => {
            if(error){
                console.log("error", error);
                res.status(500).json({"error": error})
            }
            else {
                console.log("Infos: " , info)
                res.status(200).json({"Info" : info})
            }
        })
      
    },
    getSearchAnime : (req, res) => {
        mangas.search('anime', 'naruto', (error, info) => {
            if(error){
                console.log("error", error);
                res.status(500).json({"error": error})
            }
            else {
                console.log("Infos: " , info)
                res.status(200).json({"Info" : info})
            }
        })
      
    }
}