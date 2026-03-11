import { Link } from "react-router-dom";

export default function AboutUsPage() {
  const features = 
  [
    "Classifiche storiche aggiornate.",
     "Testi completi di ogni brano in gara.",
      "Esibizioni video integrate da YouTube.",
       "Dettagli su conduttori e premi speciali."
  ]
  const stats = 
  [
    { number: "70+", text: "Edizioni" },
     { number: "150+", text: "Canzoni" },
      { number: "100+", text: "Artisti" }
  ]

  return (
    <div className="container mt-1 pb-5">

      <div className="row align-items-center mb-1 mt-4">
        <div className="col-12 text-end">
          <h1 className="display-2 mb-0 fw-bold text-first text-uppercase">Chi Siamo</h1>
          <p className="fs-4 text-muted">La memoria digitale del Festival della Canzone Italiana.</p>
        </div>
      </div>
      <hr />

      <div className="row g-5 py-5">

        <div className="col-md-6">
          <h3 className="fw-bold text-first mt-3 text-uppercase mb-4">La nostra Missione</h3>
          <p className="fs-5 leading-relaxed"><strong>Sanremissimo</strong> nasce dalla passione per la kermesse più amata e discussa d'Italia. Il nostro obiettivo è creare un archivio dinamico, moderno e accessibile dove ogni edizione, ogni artista e ogni singola nota possa essere celebrata.</p>
          <p className="fs-5">Dalle grandi orchestre degli anni '50 alle rivoluzioni digitali di oggi, raccogliamo testi, classifiche e video per non perdere la storia della musica italiana.</p>
        </div>

        <div className="col-md-6">
          <div className="p-4 border-start border-secondary border-first">
            <h5 className="fw-bold text-uppercase text-first mb-3">Cosa troverai qui:</h5>
            <ul className="list-unstyled fs-5">
              {features.map((feature, index) => <li key={index} className="mb-3"><i className="bi bi-check2-circle me-2 text-first"></i>{feature}</li>)}
            </ul>
          </div>
        </div>
      </div>
      <div className="row g-4 mt-2 mt-md-5">
        <h3 className="fw-bold mb-2 mb-md-4 text-uppercase text-center display-5">I nostri numeri</h3>
        {stats.map((stat , index) => (
          <div key={index} className="col-md-4 text-center">
            <div className="p-4">
              <h2 className="display-4 fw-bold text-first mb-0">{stat.number}</h2>
              <p className="text-uppercase fw-bold">{stat.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-2 pt-md-5 text-center">
        <Link to="/" className="btn px-5 py-2 pb-0 text-uppercase fw-bold fs-4 btn-hover"><i className="bi bi-arrow-left me-2"></i>Esplora l'archivio</Link>
      </div>
    </div>
  )
}