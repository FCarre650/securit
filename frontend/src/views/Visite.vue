<template>
    <div class="login-container">
        <header>
            <div class="securit-header">
                <img src="../assets/images/logo.png" alt="logo"/>
            </div>
        </header>
        <main>
            <h2>Visites</h2>
            <div class="search">
                <div class="search-container">
                    <i class="fa-solid fa-magnifying-glass" style="color:grey" ></i>
                    <input class="search-bar" type="text" placeholder="Rechercher"/>
                    <i class="fa-solid fa-circle-xmark" style="color:grey"></i>
                </div>
                <div class="add-button">
                    <a href="/new-visite"><i class="fa-solid fa-plus"></i></a>
                </div>
            </div>
            <% for (const visit of visits) { %> 
           <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Entreprise</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><%= visit.date.toISOString().slice(0, 10) %></td>
                        <td><%= visit.company.name %></td>
                        <td class="arrow-cell">
                            <a class="arrow-link" href="#">
                                <i class="fa-solid fa-arrow-right"></i>
                            </a>
                        </td>
                    </tr>
                    <% }; %>
                </tbody>
           </table>

           <div class="nav-bar">
                <div class="nav-item active">
                    <a class="star-link" href="#">
                        <i class="fa-solid fa-star"></i>
                    </a>
                    <span>Visites</span>
                </div>
                <div class="nav-item">
                    <a class="star-link" href="#">
                        <i class="fa-solid fa-star"></i>
                    </a>
                    <span>Entreprises</span>
                </div>
                <div class="nav-item">
                    <a class="star-link" href="#">
                        <i class="fa-solid fa-star"></i>
                    </a>
                    <span>Réglages</span>
                </div>
           </div>
        </main>
    </div>
</template>


<script setup>

</script>