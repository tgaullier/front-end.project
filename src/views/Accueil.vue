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
export default {
  data () {
    return {
      url: 'http://localhost:8081',
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
          name: 'Frozen Yogurt',
          image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          resume: 6.0
        },
        {
          name: 'Ice cream sandwich',
          image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          resume: 9.0
        },
        {
          name: 'Eclair',
          image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          resume: 16.0
        },
        {
          name: 'Cupcake',
          image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          resume: 3.7
        },
        {
          name: 'Gingerbread',
          image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          resume: 16.0
        },
        {
          name: 'Jelly bean',
          image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          resume: 0.0
        },
        {
          name: 'Lollipop',
          image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          resume: 0.2
        },
        {
          name: 'Honeycomb',
          image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          resume: 3.2
        },
        {
          name: 'Donut',
          image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          resume: 25.0
        },
        {
          name: 'KitKat',
          image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          resume: 26.0
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
      const response = this.axios.get(this.url + 'https://api.jikan.moe/v3/search/anime?q=Fate/Zero&page=1')
      console.log('response is:', response)
    }
  }
}
</script>
