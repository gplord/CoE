# New Variorum Shakespeare Digital Challenge

## Entry Information

The MLA Committee on the New Variorum Edition of Shakespeare is sponsoring a digital challenge and is seeking the most innovative and compelling uses of the data contained within its recently published volume, _The Comedy of Errors_.

The MLA has released the XML files and schema for _The Comedy of Errors_ under a [Creative Commons BY-NC 3.0 license](http://creativecommons.org/licenses/by-nc/3.0/). Scholars may freely [download these files from GitHub](http://github.com/mlaa/nvs-challenge) and use this material in their research.

We are seeking innovative new means of displaying, representing, and exploring this data and are thus holding a competition to find the most exciting API, interface, visualization, data-mining project, or other use of _The Comedy of Errors_ XML.

Entries will be judged by the committee, working with the office of scholarly communication. The winner will receive $500 and will be recognized at the 2013 MLA convention in Boston. Other entries may be displayed at the convention as well.

URLs for all entries must be submitted by e-mail to <nvs@mla.org> and must be received no later than Friday, 31 August 2012, at 11:59 p.m. eastern daylight time.

## A Note on Data Design and TEI Conformance

The MLA is making a preliminary version of the source XML data for its NVS editions publicly available for research and experimentation. Some explanation of the motives guiding the design of the data and of the data’s status as an intellectual product may be helpful to those who wish to use the data.

First, the version of the data currently being shared is designed primarily for internal use as part of the production process for the NVS print volumes. It is offered as is, for experimentation. It is not intended as a model of good practice in the use of TEI. The current version of the data is not in the TEI namespace but in an NVS namespace. This is a practical measure to simplify certain aspects of the production process. A future release of the data, intended for public use, will use the TEI namespace (with NVS-specific elements in the NVS namespace).

A second point of relevance for potential users is the question of TEI conformance. As those familiar with the TEI will know, TEI conformance is a strictly defined concept; conformant data must be valid against a strict subset of the TEI schema, featuring no new elements or structural changes. The TEI also defines two other categories of data: TEI-conformable data (which can be converted to TEI conformance automatically without information loss) and TEI extensions (which use the TEI but make more substantial structural changes and additions to the tagset). (For full details, please see chapter 23 of the TEI guidelines: <http://www.tei-c.org/release/doc/tei-p5-doc/en/html/USE.html>.) For the NVS, TEI conformance is not possible because of the substantial number of structural adaptations necessary to accommodate NVS-specific features. Some of these may be of value to other edition projects and will be shared in the future with the TEI community as feature requests, but others are simply artifacts of the NVS editions and production process and are not candidates for inclusion in the TEI proper. As a result, the NVS data set taken as a whole can be expressed as a TEI extension but not as TEI conformant or TEI conformable, since it cannot be converted to a conformant format without loss of information.

However, it is important to note that the data can be converted to TEI conformance by eliminating NVS-specific features through a fairly straightforward process using a tool like XSLT. The accompanying documentation describes the function of all NVS-specific elements, which may be helpful in deciding on the closest TEI equivalent (or in determining whether the element and its content could be jettisoned altogether).

Finally, the MLA may in the future create versions of the data that are specifically intended to support an electronic NVS edition, and those versions may better lend themselves to expression as TEI conformant or conformable data (since they will not have to support the print-specific features of the edition).

This work is licensed under a [Creative Commons Attribution-NonCommercial 3.0 Unported License](http://creativecommons.org/licenses/by-nc/3.0/).

![Creative Commons License](http://i.creativecommons.org/l/by-nc/3.0/88x31.png)