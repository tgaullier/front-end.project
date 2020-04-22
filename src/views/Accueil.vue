<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
        >

        <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="https://www.durhamlibrary.org/wp-content/uploads/2016/10/anime.png"
          transition="scale-transition"
          width="70"
        />
        </div>
          <v-btn text @click="getSearchAnime()">Search</v-btn>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            label="Search"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn router :to="`/`" text>
            <v-icon>mdi-home</v-icon>
            <span class="mr-2">Accueil</span>
          </v-btn>

          <v-btn router :to="`/profile`" text>
            <v-icon>mdi-account</v-icon>
            <span class="mr-2">Profile</span>
          </v-btn>

        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card
              class="mx-auto"
              max-width="344"
            >
              <v-img
                :src="item.image"
                height="200px"
              ></v-img>
              <v-card-title class="font-weight-bold">{{ item.name }}</v-card-title>

              <v-card-subtitle>{{ item.resume }}</v-card-subtitle>

              <v-divider></v-divider>
              <v-card-actions>
                <v-btn text @click="buttonClicked(item.name)">ajouter</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { apiV1URL } from '@/utils/apiUrl.js'
import _mangas from 'jikan-node'
export default {
  data () {
    return {
      url: `${apiV1URL}/findanime`,
      anime: [],
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      temp: '',
      itemsPerPage: 8,
      sortBy: 'name',
      keys: [
        'Name',
        'Image',
        'Resume'
      ],
      items: [
        {
          name: 'Naruto',
          image: 'https://fr.web.img2.acsta.net/pictures/19/08/02/15/12/4423178.jpg',
          resume: 'L\'histoire commence pendant l\'adolescence de Naruto, vers ses douze ans. Orphelin cancre et grand farceur, il fait toutes les bêtises possibles pour se faire remarquer.'
        },
        {
          name: 'Kingdom',
          image: 'https://media.senscritique.com/media/000005585139/160/Kingdom.jpg',
          resume: 'En Chine, il y a des centaines et des centaines d’années, le récit suit le jeune Shin dans son chemin vers l\'accomplissement de son rêve : devenir un Grand Général. Dans cette Chine ancestrale, Shin est originaire de l\'État de Qin en proie à de nombreux soubresauts aussi bien à l\'intérieur du royaume, mais aussi à l\'extérieur.'
        },
        {
          name: 'Full Metal Alchemist',
          image: 'http://fr.web.img4.acsta.net/c_216_288/pictures/19/07/29/15/50/2364027.jpg',
          resume: 'Dans le pays d\'Amestris, pays où l\'Alchimie est élevée au rang de science universelle, deux frères, Edward et Alphonse Elric parcourent le monde à la recherche de la légendaire pierre philosophale dans le but de retrouver leurs corps perdus.'
        },
        {
          name: 'Shingeki no Kyojin',
          image: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
          resume: 'Plus de cent ans avant le début de l’histoire, des créatures géantes humanoïdes nommées Titans sont subitement apparues et ont presque anéanti l’humanité. Ces créatures géantes font habituellement entre trois et quinze mètres de haut, avec quelques exceptions comme le Titan colossal qui en mesure soixante1.'
        },
        {
          name: 'Parasyte',
          image: 'https://media.senscritique.com/media/000009634525/160/Parasyte.jpg',
          resume: 'Une nuit, des sphères de la taille de balles de tennis, contenant des créatures à l\'apparence de serpents, tombent en nombre inconnu partout dans le monde. Ils sont programmés pour prendre la place des cerveaux humains.'
        },
        {
          name: 'Samouraï Champloo',
          image: 'https://manga.tokyo/wp-content/uploads/2019/09/5d8b8000486f5-200x300.jpg',
          resume: 'L histoire se déroule dans une version fictive de l ère Edo au Japon.'
        },
        {
          name: 'My hero academia',
          image: 'https://www.cgrcinemas.fr/tours/evenement/MHA.jpg',
          resume: 'Dans un monde où 80 % de la population mondiale possède des super-pouvoirs, ici nommés "Alters", n\'importe qui peut devenir un héros ou, s\'il le souhaite, un criminel.'
        },
        {
          name: 'The Seven Deadly Sins',
          image: 'https://images-na.ssl-images-amazon.com/images/I/A1kyqwzPP1L.jpg',
          resume: 'Liones, royaume de Britannia. Le Grand Maître des Chevaliers Sacrés Zaratras a été sauvagement assassiné, et les fautifs seraient un ordre de chevaliers légendaires au nombre de sept au service du roi qui voulaient renverser le trône.'
        },
        {
          name: 'Bleach',
          image: 'https://i.pinimg.com/originals/ce/9c/93/ce9c938d04a67fec228835f4e91ee3a9.jpg',
          resume: 'Le récit commence en 2001 au Japon dans la ville fictive de Karakura. Ichigo Kurosaki, lycéen de 15 ans, arrive à voir, entendre et toucher les âmes des morts depuis qu\'il est tout petit. '
        },
        {
          name: 'One Piece',
          image: 'https://www.raprnb.com/wp-content/uploads/2020/04/7799989264_one-piece-arrive-sur-netflix-en-live-action.jpg',
          resume: 'L\'histoire de One Piece se déroule dans un monde fictif dominé par les océans, où certains pirates aspirent à une ère de liberté et d\'aventure connue comme "l\'âge d\'or de la piraterie". '
        }
      ]
    }
  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== 'Name')
    }
  },
  methods: {
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },
    buttonClicked (name) {
      return console.log(name)
    },
    getSearchAnime () {
      const mangas = new _mangas()
      mangas.search('anime', 'naruto')
        .then(info => console.log(info))
        .catch(err => console.log(err))
    }
  }
}
</script>
