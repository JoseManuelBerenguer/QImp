# QASM OMAX (Max/MSP)

## 🎯 Overview

This repository contains a quantum-inspired generative system implemented in Max/MSP, combining:

- Quantum gate sequencing via JavaScript (`qasm_omax.js`)
- A minimal local simulator derived from microQiskit (`micro_qiskit_omax.js`)
- Patchers for spectral processing and control:
  - `0.caparazon.maxpat`
  - `fftfilter1.maxpat`
  - `fftfilter2.maxpat`
  - `pffttotal.maxpat`
  - `zsa.totalabstraction~.maxpat`
- Audio descriptors via `zsa~`
- Spatial reverb with `hiss.convolver~` from the HISSTools IR Toolbox
- Interface logic in `demantisa.js`

## 🧩 Components

### JavaScript Engine (Apache 2.0)
Forked and adapted from [quantum-music-playground](https://github.com/JJavaFXpert/quantum-music-playground).  
All original licensing and attribution are preserved in headers.

### zsa~
Max/MSP external for real-time audio descriptors.  
**Free for non-commercial use only.** Contact original authors for commercial licensing.

### HISSTools (HIRT)
Impulse response toolbox for Max, including `hiss.convolver~`.  
Licensed under a permissive BSD-style license. See LICENSE for full terms.

## 📜 License

This project is distributed under multiple licenses.  
See the [`LICENSE`](./LICENSE) file for complete legal details.

© 2024 José Manuel Berenguer
