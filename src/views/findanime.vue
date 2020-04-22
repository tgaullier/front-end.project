<template> 
<v-container>
<v-row>
    <v-col>
        <v-data-table 
             :headers="headers"
             :items="anime"
             :items-per-page="5"
              class="elevation-1"
                hide-default footer>
    <template v-slot:top>
        <v-btn color ="success" test-xs-right >
    </template>
        </v-data-table>
    </v-col>
    </v-row>
</v-container> 
</template>

<script>
import {apiV1URL}
 from '@utils/apiUrl.js'
 export default {
     data : () => ({
            url : `${apiV1URL}/findanime`,
            anime : [],
            headers : [
                {
                    text : "title",
                    value : "title"
                }
            ]
     }),
     methods : {
         getFindAnime(){
             this.anime = []
             const response = await fetch(`${this.url}`)
             console.log(response)
             const_anime = await response.json()
             this.anime.push(_anime)
             console.log(this.anime)

         }
     }
    
 
 }
 </script>