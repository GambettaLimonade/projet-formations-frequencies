import requests
from bs4 import BeautifulSoup
from datetime import datetime

# Dictionnaire pour mapper les abréviations françaises des mois à leurs équivalents en anglais
mois_mapping = {
    "Jan": "Jan",
    "Fév": "Feb",
    "Mar": "Mar",
    "Avr": "Apr",
    "Mai": "May",
    "Juin": "Jun",
    "Juil": "Jul",
    "Aoû": "Aug",
    "Sep": "Sep",
    "Oct": "Oct",
    "Nov": "Nov",
    "Déc": "Dec"
}

# Fonction pour formater les résultats sous forme de requête SQL
def format_insert_query(titre, date, lien):
    # Convertir la date en format PostgreSQL (YYYY-MM-DD)
    try:
        # Remplacer le mois français par l'équivalent anglais
        for fr, en in mois_mapping.items():
            if fr in date:
                date = date.replace(fr, en)
                break
        date_debut = datetime.strptime(date, "%d %b %Y").strftime("%Y-%m-%d")
    except ValueError:
        date_debut = "NULL"  # Si la date n'est pas valide, utiliser NULL

    # Format SQL des valeurs à insérer dans la table "formation"
    return f"('{titre}', '{date_debut}', NULL, 0, 8, 12, '{lien}')"

# Fonction pour récupérer les cours d'une page donnée
def get_courses_from_page():
    # URL de la page de résultats de recherche pour les cours
    url = "https://formations-benevoles.org/occitanie/widget/"

    # Effectuer une requête GET pour récupérer la page
    response = requests.get(url)

    # Vérifier que la requête a réussi (code HTTP 200)
    if response.status_code == 200:
        # Utiliser BeautifulSoup pour analyser le HTML de la page
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Rechercher tous les éléments <div> avec la classe "content"
        course_divs = soup.find_all("div", class_="content")
        
        # Liste pour stocker les requêtes SQL à insérer
        insert_queries = []
        
        # Extraire les informations nécessaires et formater en requêtes SQL
        for div in course_divs:
            # Trouver le lien dans l'élément <div>
            link = div.find('a', class_='h-content')
            if link:
                titre = link.text.strip()
                lien = link['href']
                
                # Trouver la date dans l'élément <div>
                date_paragraph = div.find('p', class_='p-content')
                date = date_paragraph.text.strip() if date_paragraph else "NULL"
                
                # Formater la requête SQL pour ce cours et l'ajouter à la liste
                insert_query = format_insert_query(titre, date, lien)
                insert_queries.append(insert_query)
        
        # Préparer la requête d'insertion SQL
        insert_statement = "INSERT INTO formation (titre, date_debut, date_fin, prix, categorie_id, fournisseur_id, lien) VALUES\n"
        insert_statement += ",\n".join(insert_queries) + ";"

        # Écrire la requête SQL dans un fichier texte
        with open('INSERT_NEW_FORMATIONS_LMAO.txt', 'w', encoding='utf-8') as file:
            file.write(insert_statement)

        print("\nLes requêtes SQL ont été enregistrées dans 'INSERT_NEW_FORMATIONS_LMAO.txt'.")
    else:
        print(f"Erreur lors de la récupération de la page: {response.status_code}")

get_courses_from_page()