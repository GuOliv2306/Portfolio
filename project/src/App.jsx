function App() {
  // Smooth-scroll for in-page anchors
  React.useEffect(() => {
    const handle = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior:'smooth' });
    };
    document.addEventListener('click', handle);
    return () => document.removeEventListener('click', handle);
  }, []);

  return (
    <React.Fragment>
      <CursorFollower />
      <Navbar />
      <main>
        <Hero />
        <Competencias />
        <Projetos />
        <Certificados />
        <Depoimentos />
        <Contato />
      </main>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
