<?xml version="1.0" encoding="UTF-8"?>

<!-- Auteur: Daniel El-Masri (20096261) -->
<!-- IFT3225 - Travail Pratique 2 Exercice 2.1 -->
<!-- 12 Juillet 2020 -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="1.0">

    <xsl:output method="xml"
        doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
        doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
        encoding="UTF-8"
        indent="yes"/>

    <xsl:template match="/">
        <html>
            <head>
                <meta content="text/html; charset=UTF-8"/>
                <title>IFT3225_El-Masri_Daniel_Exercice_2.1</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"/>
                <link rel="stylesheet" type="text/css" href="./IFT3325_El-Masri_Daniel_Exercice2_1.css"/>
            </head>
            <body>
                <h2>Liste des Auteurs et leurs informations</h2>
                <xsl:for-each select="//auteur">
                    <div class="auteur">
                        <xsl:variable name="auteurID" select="@ident"/>
                        <div class="col-6 col-sm-6 col-lg-4">
                            <div class="card">
                                <img max-height="" class="card-img-top" alt="image de l'auteur">
                                    <xsl:attribute name="src">
                                        <xsl:value-of select="photo"></xsl:value-of>
                                    </xsl:attribute>
                                </img>
                                <div class="card-body">
                                    <h3>Informations Personnelles: </h3>
                                    <p><b><xsl:text>Nom: </xsl:text></b><xsl:value-of select="nom"/></p>
                                    <p><b><xsl:text>Prénom: </xsl:text></b><xsl:value-of select="prenom"/></p>
                                    <p><b><xsl:text>Pays: </xsl:text></b><xsl:value-of select="pays"/></p>
                                    <xsl:if test="commentaire">
                                        <p><b><xsl:text>Commentaire: </xsl:text></b><xsl:value-of select="commentaire"/></p>
                                    </xsl:if>
                                    <h3>Informations Sur les Livres: </h3>
                                    <xsl:apply-templates select="//livre[contains(@auteurs, $auteurID)]">
                                        <xsl:sort select="prix"/>
                                    </xsl:apply-templates>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                </xsl:for-each>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="livre">
        <p><b><xsl:text>Titre: </xsl:text></b><xsl:value-of select="titre"/></p>
        <p><b><xsl:text>Langue: </xsl:text></b><xsl:value-of select="@langue"/></p>
        <p><b><xsl:text>Annee: </xsl:text></b><xsl:value-of select="annee"/></p>
        <p><b><xsl:text>Prix: </xsl:text></b><xsl:value-of select="prix"/></p>
        <p><b><xsl:text>Devise: </xsl:text></b><xsl:value-of select="prix/@devise"/></p>
    </xsl:template>
    
</xsl:stylesheet>
