// public/admin/preview.js

// Registra o estilo do "BlackMed" dentro da área de escrita
CMS.registerPreviewStyle("https://fonts.googleapis.com/css2?family=Exo+2:wght@600;700;800&family=Poppins:wght@300;400&display=swap");

// Injeta CSS básico apenas na área de visualização do post
CMS.registerPreviewStyle(`
  body {
    background-color: #050505;
    color: #e5e5e5;
    font-family: 'Poppins', sans-serif;
    padding: 20px;
    line-height: 1.6;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Exo 2', sans-serif;
    color: white;
    font-weight: 700;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }
  h1 { font-size: 2.5em; color: white; line-height: 1.1; }
  h2 { color: #E07720; text-transform: uppercase; letter-spacing: 1px; }
  a { color: #E07720; text-decoration: none; }
  strong { color: white; font-weight: bold; }
  blockquote {
    border-left: 4px solid #E07720;
    padding-left: 15px;
    color: #b0b0b0;
    font-style: italic;
    background: rgba(255,255,255,0.05);
    padding: 10px;
  }
  img {
    max-width: 100%;
    border-radius: 8px;
    border: 1px solid #333;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }
  ul, ol { padding-left: 20px; }
  li { margin-bottom: 5px; }
`);