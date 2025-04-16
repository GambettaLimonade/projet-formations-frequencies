import requests
from bs4 import BeautifulSoup

# Fonction pour formater les résultats sous forme de requête SQL
def format_insert_query(titre, type_cours, date_debut, date_fin, prix, categorie_id, fournisseur_id, lien):
    # Format SQL des valeurs à insérer dans la table "formation"
    return f"('{titre}', '{type_cours}', {date_debut}, {date_fin}, '{prix}', {categorie_id}, {fournisseur_id}, '{lien}')"

# Fonction pour récupérer les cours d'une page donnée
def get_courses_from_page(page_num):
    # URL de la page de résultats de recherche pour les cours gratuits
    url = f"https://www.coursera.org/courses?query=free&language=French&page={page_num + 1}"

    # Effectuer une requête GET pour récupérer la page
    response = requests.get(url)

    # Vérifier que la requête a réussi (code HTTP 200)
    if response.status_code == 200:
        # Utiliser BeautifulSoup pour analyser le HTML de la page
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Rechercher tous les éléments <a> qui contiennent des informations sur les cours
        course_links = soup.find_all('a', class_='cds-119 cds-113 cds-115 cds-CommonCard-titleLink css-vflzcf cds-142')

        # Liste pour stocker les requêtes SQL à insérer
        insert_queries = []
        
        # Extraire les informations nécessaires et formater en requêtes SQL
        for link in course_links:
            # Titre du cours (dans la balise h3)
            titre = link.find('h3', class_='cds-CommonCard-title css-6ecy9b').text.strip() if link.find('h3', class_='cds-CommonCard-title css-6ecy9b') else "Pas de titre"
            
            # Lien du cours (dans l'attribut href de la balise <a>)
            course_url = link.get('href', 'Pas d\'URL')
            lien = f"https://www.coursera.org{course_url}"  # Construire l'URL complète du cours

            # Type de cours : "IT, Sport"
            type_cours = "IT"
            
            # Prix du cours : "Gratuit"
            prix = 0
            
            # Date de début et de fin : Non disponible dans l'HTML directement
            date_debut = "NULL"
            date_fin = "NULL"
            
            # Catégorie et fournisseur_id : Par défaut, j'utilise des valeurs génériques
            categorie_id = 3  # Exemple générique
            fournisseur_id = 11  # Coursera
            
            # Formater la requête SQL pour ce cours et l'ajouter à la liste
            insert_query = format_insert_query(titre, type_cours, date_debut, date_fin, prix, categorie_id, fournisseur_id, lien)
            insert_queries.append(insert_query)
        
        # Retourner toutes les requêtes SQL formatées
        return insert_queries
    else:
        print(f"Erreur lors de la récupération de la page {page_num + 1}: {response.status_code}")
        return []

# Récupérer les cours des 5 premières pages
all_queries = []
for page in range(5):  # Pages 1 à 5
    print(f"--- Page {page + 1} ---")
    queries = get_courses_from_page(page)
    all_queries.extend(queries)

# Préparer la requête d'insertion SQL
insert_statement = "INSERT INTO formation (titre, type, date_debut, date_fin, prix, categorie_id, fournisseur_id, lien) VALUES\n"
insert_statement += ",\n".join(all_queries) + ";"

# Afficher la requête SQL dans la console
print("\nRequête SQL complète à copier et exécuter :\n")
print(insert_statement)

# Écrire la requête SQL dans un fichier texte
with open('INSERT_NEW_FORMATIONS_COURSERA.txt', 'w', encoding='utf-8') as file:
    file.write(insert_statement)

print("\nLes requêtes SQL ont été enregistrées dans 'INSERT_NEW_FORMATIONS_COURSERA.txt'.")
