<?xml version="1.0" encoding="UTF-8"?>

<!-- Auteur: Daniel El-Masri (20096261) -->
<!-- IFT3225 - Travail Pratique 2 Exercice 2.2 -->
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
    
    <xsl:param name="minimum" select="0"></xsl:param>
    <xsl:param name="maximum" select="100"></xsl:param>
    
    <xsl:template match="/">
        <html>
            <head>
                <meta content="text/html; charset=UTF-8"/>
                <title>IFT3225_El-Masri_Daniel_Exercice_2.2</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"/>
                <link rel="stylesheet" type="text/css" href="./IFT3325_El-Masri_Daniel_Exercice2_2.css"/>
            </head>
            <body>
                <h2 id="title">Liste des Livres et leurs informations</h2>
                <xsl:for-each select="//livre">
                    <xsl:sort select="@auteurs" order="descending"></xsl:sort>
                    <xsl:if test="prix &gt; $minimum and prix &lt; $maximum">
                        <div class="livre">
                            <xsl:variable name="auteurName" select="@auteurs"/>
                            <div class="col-6 col-sm-6 col-lg-4">
                                <div class="card">
                                    <img max-height="" class="card-img-top" alt="image de la couverture">
                                        <xsl:attribute name="src">
                                            <xsl:value-of select="couverture"></xsl:value-of>
                                        </xsl:attribute>
                                    </img>
                                    <div class="card-body">
                                        <h3>Informations: </h3>
                                        <p><b><xsl:text>Titre: </xsl:text></b><xsl:value-of select="titre"/></p>
                                        <p><b><xsl:text>Langue: </xsl:text></b><xsl:value-of select="@langue"/></p>
                                        <p><b><xsl:text>Annee: </xsl:text></b><xsl:value-of select="annee"/></p>
                                        <p><b><xsl:text>Prix: </xsl:text></b><xsl:value-of select="prix"/></p>
                                        <p><b><xsl:text>Devise: </xsl:text></b><xsl:value-of select="prix/@devise"/></p>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                        </div>
                    </xsl:if>
                </xsl:for-each>
            </body>
        </html>
    </xsl:template>
    
</xsl:stylesheet>