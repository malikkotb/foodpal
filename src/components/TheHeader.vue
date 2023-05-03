<template>
  <header class="p-3">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <!-- logo: -->
        <a
          href="/"
          class="d-flex align-items-center mb-2 mb-lg-0 text-light text-decoration-none"
        >
          <font-awesome-icon
            class="bi ms-2 me-2"
            icon="fa-solid fa-pepper-hot"
            size="xl"
          />
          FoodPal
        </a>
        <!-- logo -->

        <ul
          class="nav col-12 col-lg-auto ms-4 me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <li>
            <router-link class="nav-link px-2 link-light" to="/home">
              <font-awesome-icon icon="fa-solid fa-bars-progress" />
              Dashboard</router-link
            >
          </li>
          <li>
            <router-link class="nav-link px-2 link-light" to="/diary">
              <font-awesome-icon icon="fa-solid fa-book-open-reader" />
              Diary
            </router-link>
          </li>
          <li>
            <router-link class="nav-link px-2 link-light" to="/news">
              <font-awesome-icon icon="fa-solid fa-comments" />
              News</router-link
            >
          </li>
          <li>
            <router-link class="nav-link px-2 link-light" to="/settings">
              <font-awesome-icon icon="fa-solid fa-ellipsis" size="lg" />
              Settings</router-link
            >
          </li>
        </ul>

        <!-- remove search bar  -->
        <!-- <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input
            type="search"
            class="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
        </form> -->

        <div class="dropdown text-end">
          <a
            href="#"
            class="d-block link-light text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt="mdo"
              width="32"
              height="32"
              class="rounded-circle"
            />
          </a>
          <ul
            class="dropdown-menu text-small"
            aria-labelledby="dropdownUser1"
            style=""
          >
            <li><a class="dropdown-item" href="#">New project...</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    setup() {
      //TODO: make all other tabs other than home and dashboard unpressable
      // if the user is not logged in
      // TODO: bind class="link-secondary or link-dark" if link is currently active (if that page is active)
      // and have custom DashBoard/Home page if User is not logged in
    },
  },
};
</script>

<style scoped>
header {
  background-color: #0066ee;
}
li:hover {
  opacity: 80%;
}
</style>
