// ============================================================
// tweaks-config.jsx — Painel de Tweaks do portfólio
// Três controles expressivos que reformulam a sensação do site:
//
//   1. Paleta (accent palette)  · troca o tom da identidade
//   2. Intensidade HUD         · de editorial silencioso a HUD total
//   3. Tom de voz tipográfico  · editorial · brutalista · máquina
//
// Os defaults estão num bloco EDITMODE em Portfolio.html, lido aqui
// via window.TWEAK_DEFAULTS. O host reescreve esse bloco no arquivo
// quando o usuário muda algo, persistindo entre reloads.
// ============================================================

const __TWK_DEFAULTS = window.TWEAK_DEFAULTS || {
  palette: ["#e8601c", "#ff7a3a", "#f4f0eb"],
  intensity: "equilibrado",
  voice: "editorial",
};

// Catálogo de paletas — cada uma é [accent, accent-strong, hint-soft].
// O primeiro entra em --accent (todas as alphas derivadas seguem via color-mix).
const PALETTES = [
  ["#e8601c", "#ff7a3a", "#f4f0eb"],   // Ember (laranja editorial original)
  ["#7e72ff", "#a59aff", "#f0eef4"],   // Iris (violeta cool)
  ["#2fa874", "#54c897", "#eef2ee"],   // Cypress (verde)
  ["#d8b76a", "#f0d28a", "#f4eee0"],   // Bone (dourado quente, quase neutro)
];

const INTENSITIES = [
  { value: "calmo",         label: "Calmo" },
  { value: "equilibrado",   label: "Equilibrado" },
  { value: "total",         label: "Total" },
];

const VOICES = [
  { value: "editorial",   label: "Editorial" },
  { value: "brutalista",  label: "Brutalista" },
  { value: "maquina",     label: "Máquina" },
];

// Aplica os tweaks no DOM. Chamado a cada mudança E na montagem inicial.
function applyTweaks(t) {
  const body = document.body;
  if (!body) return;
  const palette = Array.isArray(t.palette) ? t.palette : PALETTES[0];
  document.documentElement.style.setProperty('--accent', palette[0]);
  if (palette[1]) document.documentElement.style.setProperty('--accent-strong', palette[1]);
  body.setAttribute('data-intensity', t.intensity || 'equilibrado');
  body.setAttribute('data-voice',     t.voice     || 'editorial');
}

function TweaksHost() {
  // Hooks do starter — useTweaks expõe estado + persistência no arquivo.
  const [t, setTweak] = window.useTweaks(__TWK_DEFAULTS);

  // Aplica na montagem e em cada mudança.
  React.useEffect(() => {
    applyTweaks(t);
  }, [t]);

  return (
    <window.TweaksPanel title="Tweaks · Portfolio">
      <window.TweakSection label="Identidade">
        <window.TweakColor
          label="Paleta"
          value={t.palette}
          options={PALETTES}
          onChange={(v) => setTweak('palette', v)}
        />
      </window.TweakSection>

      <window.TweakSection label="Camada Tech">
        <window.TweakRadio
          label="Intensidade HUD"
          value={t.intensity}
          options={INTENSITIES}
          onChange={(v) => setTweak('intensity', v)}
        />
      </window.TweakSection>

      <window.TweakSection label="Tom de Voz">
        <window.TweakRadio
          label="Tipografia"
          value={t.voice}
          options={VOICES}
          onChange={(v) => setTweak('voice', v)}
        />
      </window.TweakSection>
    </window.TweaksPanel>
  );
}

// Aplica os defaults imediatamente — antes mesmo do React montar — pra evitar
// um "flash" da paleta laranja quando o usuário tiver outra preferência salva.
applyTweaks(__TWK_DEFAULTS);

// Expor
Object.assign(window, { TweaksHost });
