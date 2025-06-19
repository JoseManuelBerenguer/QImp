# QImp (Max/MSP)

## 🎯 Concept & Vision

QImp navigates an adimensional, abstract universe—aware that the journey may never reach port. It is the allegory of the echo of an impenetrable brane—a sonic artifact dwelling on the boundary between the known and the unreachable.

It expresses a realm beyond revelation: an a‑human creation that transcends human senses and unfolds before us as an enigma. Eight quantum rotations, filtered through sonic and musical descriptors, are reshaped by an unexpected oracle that inserts itself into the code like a dark sigh. The resulting QASM circuit, processed by the micro‑Qiskit simulator, produces a 256‑dimensional complex state vector that is embodied in an anti‑human space of FFT filters crafting sometimes frozen, sometimes burning soundscapes, while a reverberant piano evokes distant stars.

Thus, a poignant paradox emerges: QImp—an a‑human artifact—presents itself to humans as fragments of reality that, every 49 ms, cross the boundary between chaos and intention. We hear quantum entanglement manifested sonically—interdependent, resonant sonic structures, echoes from a universe that defies our logic.

A tremor of anti‑intuition and rhythmic irrationality, QImp does not intend to replicate human gestures. It breathes beyond us. It becomes an inverted mirror: we are not the ones who create it—instead, it reveals our inability to understand what we feel, despite its manifest beauty. In this realm, music ceases to be a human gesture and becomes an a‑human gesture—a sonic presence that transcends our empathy, inviting us, without promise, to listen to something emerging from unfathomable dimensions.

Unfortunately, I cannot give it a physical form until I secure resources to present it as an installation: in a dimly lit room, a spotlight falls on a MIDI grand piano controlled by the system. Encircled by four speakers emitting frozen or burning soundscapes according to the spectra, the system continuously generates unrepeatable productions. Meanwhile, I envision presenting its potentially infinite generative nature in IP space. For now, only the code is available, downloadable and runnable on any sufficiently powerful computer.

## 🎯 Overview

This repository contains a quantum-inspired generative system implemented in Max/MSP, combining:

- Quantum gate sequencing via JavaScript (`qasm_omax.js`)
- A minimal local simulator derived from microQiskit (`micro_qiskit_omax.js`)
- Patchers for spectral processing and control:
  - `0.QImp.maxpat`
   -`demantisa.js`
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

