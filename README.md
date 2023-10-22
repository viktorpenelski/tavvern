# Tavvern

Welcome to the Tav[vern] - the tavern where.. Tav resides.

`ui` -> standalone react frontend
`scraper` -> scraper for bg3.wiki

---

### General TODO

[ ] need to add each item `id` during scrape
[ ] and port `name` <---> `id` map to the UI to facilitate better encoding
[ ] also probably re-export all items as a map `name -> item`, as goign through the entire list takes a long time
[ ] figure out how to filter weapons for main hand / off hand / ranged main / ranged off

### UI ideas

[x] clicking out of the Modal should dismiss it
[ ] should be lazy loading the modal (and more importnatly its' search) to avoid having hundreds of hidden react component
