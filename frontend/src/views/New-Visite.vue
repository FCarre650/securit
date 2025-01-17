<template>
<div class="login-container">
        <header>
            <div class="securit-header">
                <img src="../assets/images/logo.png" alt="logo"/>
            </div>
        </header>
        <main>
            <h2 class="form-group mb-2">Nouvelle visite</h2>
            <form @submit.prevent="register_visit">
                <div class="form-group mb-2 search">
                    <label for="date">Date</label>
                    <input id="date" type="date" name="date" required="" v-model="form_data.date">
                </div>
                <div class="form-group mb-2">
                    <label for="entreprise">Entreprise</label>
                    <select id="company" name="company_id" required="">
                        <option value="" disabled="" selected="">Choisissez ...</option>
                        
                        <option name="company" value={{ company.id }}>{{ company.name }}</option>
                    </select>
                </div>
                <div class="form-group mb-4">
                    <label for="report">Compte-rendu : </label>
                    <textarea id="report" name="report" rows="4" placeholder="Décrivez la visite ..." required="" v-model="form_data.text"></textarea>
                </div>
                <button class="submit-btn" type="submit">Enregistrez la visite</button>
            </form>

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

    import { visits } from '../use/useVisit'
    import { ref, onMounted } from 'vue'

    
    const form_data = ref({})

    async function register_visit() {
         visits.value = form_data.value.visit

        const response = await fetch('/api/register_visit', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(form_data.value),
        })
        if (response.status === 200) {
            router.push('visite')
        }
    }    
    


    /** 
    onMounted(async () => {
        const response = await fetch('/api/register_visit')
        visitList.value = await response.json()

        for (const visit of visitList.value) {
            visits.value[visit.id] = visit
        }
    })*/

</script>