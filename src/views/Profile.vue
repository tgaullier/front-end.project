<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://www.durhamlibrary.org/wp-content/uploads/2016/10/anime.png"
          transition="scale-transition"
          width="70"
        />
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn router :to="`/`" text>
            <v-icon>mdi-home</v-icon>
            <span class="mr-2">Accueil</span>
          </v-btn>

          <v-btn router :to="`/profile`" text>
            <v-icon>mdi-account</v-icon>
            <span class="mr-2">Profile</span>
          </v-btn>
      </div>

    </v-app-bar>

    <v-card
        class="mx-auto my-10"
        max-width="434"
        tile
    >
        <v-img
        height="100%"
        src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
        >
        <v-row
            align="end"
            class="fill-height"
        >
            <v-col
            align-self="start"
            class="pa-0"
            cols="12"
            >
            <v-avatar
                class="profile"
                color="grey"
                size="164"
                tile
            >
                <v-img :src="profile.image"></v-img>
            </v-avatar>
            </v-col>
            <v-col class="py-0">
            <v-list-item
                color="rgba(0, 0, 0, .4)"
                dark
            >
                <v-list-item-content>
                <v-list-item-title class="title">{{ profile.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ profile.mail }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            </v-col>
        </v-row>
        </v-img>
    </v-card>

     <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">ANIME</th>
          <th class="text-left">PROGRESSION</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </v-app>
</template>

<script>
export default {
  data () {
    // eslint-disable-next-line no-return-assign
    return {
      profile: {
        image: 'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg',
        name: 'Marcus Obrien',
        mail: 'marcus@gmail.com'
      },
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159
        },
        {
          name: 'Ice cream sandwich',
          calories: 237
        },
        {
          name: 'Eclair',
          calories: 262
        },
        {
          name: 'Cupcake',
          calories: 305
        },
        {
          name: 'Gingerbread',
          calories: 356
        },
        {
          name: 'Jelly bean',
          calories: 375
        },
        {
          name: 'Lollipop',
          calories: 392
        },
        {
          name: 'Honeycomb',
          calories: 408
        },
        {
          name: 'Donut',
          calories: 452
        },
        {
          name: 'KitKat',
          calories: 518
        }
      ]
    }
  }
}
</script>
