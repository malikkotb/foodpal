<template>
  <header class="p-3 sticky-top">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <!-- logo: -->
        <router-link class="nav-link px-2 link-light" to="/diary">
          <font-awesome-icon
            class="bi ms-2 me-2"
            icon="fa-solid fa-pepper-hot"
            size="xl"
          />
          FoodPal
        </router-link>
        <!-- logo -->

        <ul
          class="nav col-12 col-lg-auto ms-4 me-lg-auto mb-2 justify-content-center mb-md-0"
        >
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
              <font-awesome-icon icon="fa-solid fa-bars-progress" />
              Settings</router-link
            >
          </li>
         
        </ul>

        <div class="dropdown text-end">
          <a
            href="#"
            class="d-block link-light text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="../assets/avatar.png"
              alt="avatar"
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
            <li>
              <router-link class="dropdown-item" to="/settings"
                >User Goals</router-link
              >
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
</script>

<style scoped>
header {
  background-color: #0066ee;
}
li:hover {
  opacity: 80%;
}
</style>
