<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
  exclude-result-prefixes="xd exsl NVSns estr edate a fo local rng tei teix"
  extension-element-prefixes="exsl estr edate" version="1.0"
  xmlns:a="http://relaxng.org/ns/compatibility/annotations/1.0"
  xmlns:edate="http://exslt.org/dates-and-times"
  xmlns:estr="http://exslt.org/strings" xmlns:exsl="http://exslt.org/common"
  xmlns:fo="http://www.w3.org/1999/XSL/Format"
  xmlns:html="http://www.w3.org/1999/xhtml"
  xmlns:local="http://www.pantor.com/ns/local"
  xmlns:rng="http://relaxng.org/ns/structure/1.0"
  xmlns:tei="http://www.tei-c.org/ns/1.0"
  xmlns:teix="http://www.tei-c.org/ns/Examples"
  xmlns:xd="http://www.pnp-software.com/XSLTdoc"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:NVSns="http://www.mla.org/NVSns">
  <xd:doc type="stylesheet">
    <xd:short> TEI stylesheet dealing with elements from the drama module,
      making HTML output. </xd:short>
    <xd:detail> This library is free software; you can redistribute it and/or
      modify it under the terms of the GNU Lesser General Public License as
      published by the Free Software Foundation; either version 2.1 of the
      License, or (at your option) any later version. This library is
      distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
      without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
      PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
      details. You should have received a copy of the GNU Lesser General Public
      License along with this library; if not, write to the Free Software
      Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA </xd:detail>
    <xd:author>See AUTHORS</xd:author>
    <xd:cvsId>$Id: drama.xsl 4801 2008-09-13 10:05:32Z rahtz $</xd:cvsId>
    <xd:copyright>2008, TEI Consortium</xd:copyright>
  </xd:doc>
  <xd:doc>
    <xd:short>Process elements NVSns:actor</xd:short>
    <xd:detail> </xd:detail>
  </xd:doc>
  <xsl:output method="text"/>
 
<xsl:template match="NVSns:container">
commentaryNotes = [
<xsl:apply-templates/>
]
</xsl:template>

<xsl:template match="NVSns:head">
</xsl:template>
<xsl:template match="NVSns:div">
<xsl:apply-templates/>
</xsl:template>
<xsl:template match="NVSns:note">{"line":"<xsl:value-of select="substring(@target,2)"></xsl:value-of>","label":"<xsl:value-of select="NVSns:label"/>","lemma":"<xsl:value-of select="NVSns:lem"></xsl:value-of>","value":"<xsl:apply-templates/>"},
</xsl:template>

<xsl:template match="NVSns:label">

</xsl:template>

<xsl:template match="NVSns:lem">

</xsl:template>

<xsl:template match="NVSns:p">
&lt;p&gt;<xsl:apply-templates/>&lt;/p&gt;
</xsl:template>

</xsl:stylesheet>




