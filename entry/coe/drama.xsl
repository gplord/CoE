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
  <xsl:output method="html"/>
 
    <xsl:template match="NVSns:container">

	<html>
	<head><title>Comedy of the Errors</title>
	<style type="text/css">
	.title{
	font-weight:bold;
	}
	.speaker{
		font-weight:bold;
		display:inline;
		padding-right: 1em;
	}
	.inner_stage{
	font-style: italic;
	display: inline;

	}
	.deleted{
	text-decoration: line-through;
	}
	
	.outer_stage{
	font-style: italic;
	padding-bottom:1ex;
	}
	.p{
	display: inline;
	}
	.sp{
	font-size:12pt;
	}
	.playtext{
	width: 500px;
	padding-left:5px;
	}
	.TOC{
	width: 400px;
	padding-left:5px;
	}
	.head{
	font-weight:bold;
	padding-bottom: 1ex;
	padding-top: 2ex;
	}
	
	ul{
		list-style-type: none;
	}
	.print_tln{
	float: right;
	
	}
	.stage{
	font-style: italic;
	
	}
	.align-right{
	float: right;
	padding-right: 5ex;
	}
	.align-center{
	text-align: center;
	}
	
	</style>
	</head>
	<body>
	<div class="playtext">
		<xsl:apply-templates/>
		</div>
		</body>
</html>	
  </xsl:template>

<!-- two declarations are needed for this key so that the '#' may be
    stripped from the @synch value -->

  <xsl:template match="NVSns:sp">
  
  	<div>
  	<xsl:attribute name="class"><xsl:text>sp </xsl:text><xsl:value-of select="substring(@who,2)"></xsl:value-of></xsl:attribute>
  	
		
  		<xsl:apply-templates/>
  	</div>	

  </xsl:template>
  <xsl:template match="NVSns:del">
  <div class="deleted"><xsl:apply-templates/></div>
  </xsl:template>
  <xsl:template match="NVSns:p">
   		
   		<div class="p">
   			<xsl:apply-templates/>
		</div>
 </xsl:template>

<xsl:template match="NVSns:name">
		
			<span class="name">
				
			<xsl:apply-templates/></span>
			
</xsl:template>
    
    <xsl:template match="NVSns:hi[@rend='italic']">
		
			<em>
				
			<xsl:apply-templates/></em>
			
</xsl:template>	
<xsl:template match="NVSns:hi[@rend='superscript']">
		
			<sup>
				
			<xsl:apply-templates/></sup>
			
</xsl:template>

	<xsl:template match="NVSns:milestone">
		
			<a>
			<xsl:attribute name="id"><xsl:value-of select="@n"></xsl:value-of></xsl:attribute>
			<xsl:attribute name="class"><xsl:value-of select="@unit"></xsl:value-of></xsl:attribute>	
			</a>
			
</xsl:template>

	<xsl:template match="NVSns:lg">
		
			<div class="lg">
				
			<xsl:apply-templates/></div>
			
</xsl:template>

<xsl:template match="NVSns:castList">
		
			<div class="castList">
				
			<xsl:apply-templates/></div>
			
</xsl:template>
	

<xsl:template match="NVSns:l">
	

			<div class="line">
			
			
				
			<xsl:apply-templates/></div>
			
</xsl:template>
<xsl:template match="NVSns:speaker">	



<div class="speaker">

	<xsl:apply-templates/>
	</div>
</xsl:template>
	

      <xsl:template match="NVSns:stage">
      
      <div>
      	<xsl:attribute name="class"><xsl:text>stage </xsl:text><xsl:value-of select="@type"></xsl:value-of><xsl:text> align-</xsl:text><xsl:value-of select="substring-before(substring-after(@rend,'align('),')')"></xsl:value-of></xsl:attribute>
  	
		
  		
      <xsl:apply-templates/>
    </div>
  </xsl:template>
 <xsl:template match="//NVSns:teiHeader">
  
  </xsl:template>
   <xsl:template match="//NVSns:head">
  <div class="head">
        <xsl:apply-templates/>
  </div>
  </xsl:template>
 <xsl:template match="//NVSns:titlePart">
     
 <div>
 
 <xsl:apply-templates/></div>
  
  </xsl:template>
   <xsl:template match="//NVSns:docAuthor">
     
 <div>
 
 <xsl:apply-templates/></div>
  </xsl:template>
       <xsl:template match="//NVSns:lb">
 
       <br/><a>
       <xsl:variable name="thisid" select="@xml:id"/>
  <xsl:attribute name="id"><xsl:value-of select="$thisid"></xsl:value-of></xsl:attribute>
   <xsl:attribute name="class">ref_line</xsl:attribute>
  	    <xsl:if test="@rend = 'print_tln'">
 	<span class="print_tln">
 	 <xsl:attribute name="id">print_<xsl:value-of select="$thisid"></xsl:value-of></xsl:attribute>
 	<xsl:value-of select="@n"></xsl:value-of>
 	</span>
       </xsl:if>
	 </a>   
       </xsl:template>
              <xsl:template match="//NVSns:item">
              <div class="listItem"> <xsl:value-of select='.'/></div>
       </xsl:template>
          <xsl:template match="//NVSns:castItem">
              <div class="listItem"> <xsl:value-of select='.'/></div>
       </xsl:template>
     <xsl:template match="//NVSns:front">
      
 <div>
 
 <xsl:apply-templates/></div><br/>
  
  </xsl:template>

   


</xsl:stylesheet>
