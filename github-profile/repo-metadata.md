# Proposed GitHub repo metadata

Snapshot 2026-11-09: 34 public repos, 6 with a description, 13 with a homepage, 0 with topics.
Every description below comes from the repo's own README (or its files, where there is no README). Every homepage was checked and returns 200; homepages that currently 404 are proposed for removal.

**Nothing has been changed on GitHub.** The commands at the bottom write to GitHub, so they wait for your "yes".

## 1. Keep public: description, homepage, topics

| Repo | Proposed description | Homepage | Topics |
|---|---|---|---|
| `om-os` | My portfolio: a neo-brutalist OS-style site built with React, TypeScript and Vite, prerendered for SEO. | https://om-os.vercel.app | portfolio, react, typescript, vite, tailwindcss |
| `Kolhapur-Digital-Twin` | Phase-1 pluvial-flood nowcasting digital twin for Kolhapur (MRSAC internship), on open Sentinel-1/2, SRTM and IMD data, with an honest back-test. | (none) | digital-twin, flood-nowcasting, remote-sensing, sentinel-1, geospatial, fastapi |
| `Krishna-River-Flood` | Interactive Leaflet simulation of the Upper Krishna basin: dam discharge, inundation zones and landslide susceptibility. | https://krishna-river-flood.vercel.app | digital-twin, leaflet, gis, flood-simulation |
| `Major-Project-Simulation` | Interactive walkthrough of an offline agentic RAG + Text-to-SQL system (Router, SQL, RAG, Synthesis, Verifier agents). | https://major-project-simulation.vercel.app | rag, agentic-ai, text-to-sql, nextjs, simulation |
| `Automatic-waste-segregation-with-computer-vision` | Custom YOLOv8 on a Raspberry Pi classifies waste and drives servos into six bins; dashboard with a browser simulation mode. | https://automatic-waste-segregation-with-co.vercel.app | yolov8, raspberry-pi, computer-vision, waste-segregation, flask |
| `PPE` | PPE compliance monitoring with YOLOv11 (helmet, vest, gloves, boots, goggles) and deduplicated Twilio alerts. | (none) | yolov11, object-detection, ppe-detection, opencv, twilio |
| `Sarcasm-Detection` | Sarcasm detection for Marathi and other low-resource Indian languages: XLM-RoBERTa + BiLSTM, custom annotated data, LIME/SHAP. | (none) | nlp, sarcasm-detection, marathi, xlm-roberta, low-resource-languages |
| `IntruShield` | Binary and 5-class network intrusion detection on NSL-KDD with a leak-free evaluation protocol and SHAP explanations. | (none) | intrusion-detection, nsl-kdd, machine-learning, shap, fastapi |
| `Neonatal` | EdgeSeiz-Net: lightweight EEG seizure detection for edge devices, evaluated patient-independently on CHB-MIT. | (none) | eeg, seizure-detection, edge-ai, chb-mit, deep-learning |
| `ADHYAYAN` | Offline AI study assistant: local Ollama model and embeddings, no API key, no internet after setup. | (none) | ollama, rag, offline-ai, education, fastapi |
| `Clone-Detector` | SwarKavach: simulation of an on-device voice-clone shield for phone calls (Smart India Hackathon 2026, SIH26104). | https://clone-detector.vercel.app | voice-cloning, deepfake-detection, smart-india-hackathon, simulation |
| `Image-Inspector` | Local image quality and defect detection: blur, exposure, noise, JPEG artefacts and autoencoder anomaly heatmaps. | (none) | computer-vision, image-quality, anomaly-detection, opencv, fastapi |
| `QR-Project` | QR-code menu and table ordering for Indian restaurants: live orders, kitchen display, GST bills with UPI QR, staff app. | (none) | react, express, mongodb, socket-io, capacitor |
| `Waste-Sorting-Simulation` | Browser simulation of a TFLite-vision, Arduino-driven 6-DOF robotic arm sorting waste into five bins. | https://waste-sorting-simulation.vercel.app | robotics, simulation, tensorflow-lite, arduino |
| `Waste-Management` | Write-up of a smart bin that classifies dry/wet waste with computer vision and reports fill levels to a dashboard. | (none) | iot, computer-vision, smart-city, waste-management |
| `AadhaarX` | Identity-verification prototype: Next.js console, NestJS gateway, FastAPI face-liveness service, proof-of-authority ledger. | (none) | identity-verification, nextjs, nestjs, fastapi, liveness-detection |
| `routeiq-enterprise` | Road-health scoring with XGBoost + SHAP, Sentinel-2 analysis and a budget-constrained repair planner. | (none) | smart-city, xgboost, gis, nextjs, nestjs |
| `ai-autonomous-cyber-threat-detection` | Autoencoder anomaly detection, attack classification and a PPO agent choosing mitigations, with a Streamlit dashboard. | (none) | cybersecurity, anomaly-detection, reinforcement-learning, xgboost, streamlit |
| `MathGPT` | Neuro-symbolic maths assistant: LangGraph agents with SymPy and Lean 4 checks. | https://math-gpt-frontend-two.vercel.app | llm, langgraph, sympy, lean4, math |
| `earth-science-agi` | Multi-agent earth-science assistant with groundwater, erosion and seismic solvers and NDVI/NDWI processing. | **remove** (earth-science-agi.vercel.app returns 404) | multi-agent, earth-science, gis, fastapi, nextjs |
| `Urdu-Violence-Detection-AI` | Explainable detection of violence incitation in Urdu social-media text, as Docker microservices. | https://urdu-violence-detection-ai.vercel.app | nlp, urdu, explainable-ai, content-moderation, fastapi |
| `AgroSense` | Rainfall forecasting, crop-yield prediction and drought/flood indices for Vidarbha's 11 districts, with SHAP. | (none) | agriculture, forecasting, xgboost, shap, fastapi |
| `AegisEdge` | Design blueprint for an offline face recognition and liveness module (React Native, TFLite, SQLCipher). | (none) | face-recognition, liveness-detection, tflite, react-native, design-doc |
| `Shri-Gajanan-Dental-Clinic` | Website for Shri Gajanan Multispeciality Clinic, Nagpur (Next.js, Prisma, PostgreSQL). | **remove** (current homepage returns 404) | nextjs, typescript, prisma, website |
| `SIH-NEW` → **`sih-extreme-weather-tracking`** (rename, Om, 2026-11-09) | Smart India Hackathon prototype: tracks extreme-weather anomalies in medium-range ensemble forecasts using EFI screening and a GNN. | https://sih-new-ten.vercel.app (200) | smart-india-hackathon, weather-forecasting, extreme-weather, graph-neural-network, era5 |
| `omgawande1523` | (profile README, no change) | (none) | (none) |

## 2. Proposed to archive or make private — ON HOLD (Om, 2026-11-09)

| Repo | Why | Suggestion |
|---|---|---|
| `Automatic-waste-segregation-with-computer-vision.` | Older duplicate of the waste-segregation project; no README | archive (or delete) |
| `Automatic-waste-segregation-with-computer-vision_01` | Empty duplicate | delete or archive |
| `AegisEdge-Offline` | README byte-identical to `AegisEdge` | archive |
| `Bot-Detector` | Empty repo (README is only a title) | delete or make private |
| `New-Pro` | Instagram AI-news automation; the name says nothing | rename (e.g. `instagram-ai-news`) or make private |
| `gyrotex-social` | Workspace for an Instagram account, not a project | make private |
| `Adhyayan-Simulation` | README is the Vite template; you chose not to show the simulation | archive, or add a README pointing to `ADHYAYAN` |
| `Apache-Spark` | Teaching instrument (lab); live at apache-spark-rose.vercel.app | archive, or keep with description "Interactive Apache Spark architecture teaching tool" |

## 3. Final commands for approval (write to GitHub; not run)

Run order matters: rename `SIH-NEW` first, then edit it under its new name. GitHub redirects old URLs after a rename, and the Vercel project stays linked.

```bash
gh repo rename sih-extreme-weather-tracking --repo omgawande1523/SIH-NEW --yes
gh repo edit omgawande1523/sih-extreme-weather-tracking --description "Smart India Hackathon prototype: tracks extreme-weather anomalies in medium-range ensemble forecasts using EFI screening and a GNN." --homepage "https://sih-new-ten.vercel.app" --add-topic smart-india-hackathon,weather-forecasting,extreme-weather,graph-neural-network,era5
gh repo edit omgawande1523/om-os --description "My portfolio: a neo-brutalist OS-style site built with React, TypeScript and Vite, prerendered for SEO." --homepage "https://om-os.vercel.app" --add-topic portfolio,react,typescript,vite,tailwindcss
gh repo edit omgawande1523/Kolhapur-Digital-Twin --description "Phase-1 pluvial-flood nowcasting digital twin for Kolhapur (MRSAC internship), on open Sentinel-1/2, SRTM and IMD data, with an honest back-test." --add-topic digital-twin,flood-nowcasting,remote-sensing,sentinel-1,geospatial,fastapi
gh repo edit omgawande1523/Krishna-River-Flood --description "Interactive Leaflet simulation of the Upper Krishna basin: dam discharge, inundation zones and landslide susceptibility." --homepage "https://krishna-river-flood.vercel.app" --add-topic digital-twin,leaflet,gis,flood-simulation
gh repo edit omgawande1523/Major-Project-Simulation --description "Interactive walkthrough of an offline agentic RAG + Text-to-SQL system (Router, SQL, RAG, Synthesis, Verifier agents)." --homepage "https://major-project-simulation.vercel.app" --add-topic rag,agentic-ai,text-to-sql,nextjs,simulation
gh repo edit omgawande1523/Automatic-waste-segregation-with-computer-vision --description "Custom YOLOv8 on a Raspberry Pi classifies waste and drives servos into six bins; dashboard with a browser simulation mode." --homepage "https://automatic-waste-segregation-with-co.vercel.app" --add-topic yolov8,raspberry-pi,computer-vision,waste-segregation,flask
gh repo edit omgawande1523/PPE --description "PPE compliance monitoring with YOLOv11 (helmet, vest, gloves, boots, goggles) and deduplicated Twilio alerts." --add-topic yolov11,object-detection,ppe-detection,opencv,twilio
gh repo edit omgawande1523/Sarcasm-Detection --description "Sarcasm detection for Marathi and other low-resource Indian languages: XLM-RoBERTa + BiLSTM, custom annotated data, LIME/SHAP." --add-topic nlp,sarcasm-detection,marathi,xlm-roberta,low-resource-languages
gh repo edit omgawande1523/IntruShield --description "Binary and 5-class network intrusion detection on NSL-KDD with a leak-free evaluation protocol and SHAP explanations." --add-topic intrusion-detection,nsl-kdd,machine-learning,shap,fastapi
gh repo edit omgawande1523/Neonatal --description "EdgeSeiz-Net: lightweight EEG seizure detection for edge devices, evaluated patient-independently on CHB-MIT." --add-topic eeg,seizure-detection,edge-ai,chb-mit,deep-learning
gh repo edit omgawande1523/ADHYAYAN --description "Offline AI study assistant: local Ollama model and embeddings, no API key, no internet after setup." --add-topic ollama,rag,offline-ai,education,fastapi
gh repo edit omgawande1523/Clone-Detector --description "SwarKavach: simulation of an on-device voice-clone shield for phone calls (Smart India Hackathon 2026, SIH26104)." --homepage "https://clone-detector.vercel.app" --add-topic voice-cloning,deepfake-detection,smart-india-hackathon,simulation
gh repo edit omgawande1523/Image-Inspector --description "Local image quality and defect detection: blur, exposure, noise, JPEG artefacts and autoencoder anomaly heatmaps." --add-topic computer-vision,image-quality,anomaly-detection,opencv,fastapi
gh repo edit omgawande1523/QR-Project --description "QR-code menu and table ordering for Indian restaurants: live orders, kitchen display, GST bills with UPI QR, staff app." --add-topic react,express,mongodb,socket-io,capacitor
gh repo edit omgawande1523/Waste-Sorting-Simulation --description "Browser simulation of a TFLite-vision, Arduino-driven 6-DOF robotic arm sorting waste into five bins." --homepage "https://waste-sorting-simulation.vercel.app" --add-topic robotics,simulation,tensorflow-lite,arduino
gh repo edit omgawande1523/Waste-Management --description "Write-up of a smart bin that classifies dry/wet waste with computer vision and reports fill levels to a dashboard." --add-topic iot,computer-vision,smart-city,waste-management
gh repo edit omgawande1523/AadhaarX --description "Identity-verification prototype: Next.js console, NestJS gateway, FastAPI face-liveness service, proof-of-authority ledger." --add-topic identity-verification,nextjs,nestjs,fastapi,liveness-detection
gh repo edit omgawande1523/routeiq-enterprise --description "Road-health scoring with XGBoost + SHAP, Sentinel-2 analysis and a budget-constrained repair planner." --add-topic smart-city,xgboost,gis,nextjs,nestjs
gh repo edit omgawande1523/ai-autonomous-cyber-threat-detection --description "Autoencoder anomaly detection, attack classification and a PPO agent choosing mitigations, with a Streamlit dashboard." --add-topic cybersecurity,anomaly-detection,reinforcement-learning,xgboost,streamlit
gh repo edit omgawande1523/MathGPT --description "Neuro-symbolic maths assistant: LangGraph agents with SymPy and Lean 4 checks." --homepage "https://math-gpt-frontend-two.vercel.app" --add-topic llm,langgraph,sympy,lean4,math
gh repo edit omgawande1523/earth-science-agi --description "Multi-agent earth-science assistant with groundwater, erosion and seismic solvers and NDVI/NDWI processing." --homepage "" --add-topic multi-agent,earth-science,gis,fastapi,nextjs
gh repo edit omgawande1523/Urdu-Violence-Detection-AI --description "Explainable detection of violence incitation in Urdu social-media text, as Docker microservices." --homepage "https://urdu-violence-detection-ai.vercel.app" --add-topic nlp,urdu,explainable-ai,content-moderation,fastapi
gh repo edit omgawande1523/AgroSense --description "Rainfall forecasting, crop-yield prediction and drought/flood indices for Vidarbha's 11 districts, with SHAP." --add-topic agriculture,forecasting,xgboost,shap,fastapi
gh repo edit omgawande1523/AegisEdge --description "Design blueprint for an offline face recognition and liveness module (React Native, TFLite, SQLCipher)." --add-topic face-recognition,liveness-detection,tflite,react-native,design-doc
gh repo edit omgawande1523/Shri-Gajanan-Dental-Clinic --description "Website for Shri Gajanan Multispeciality Clinic, Nagpur (Next.js, Prisma, PostgreSQL)." --homepage "" --add-topic nextjs,typescript,prisma,website
```

**Held, do not run yet.** Archive and visibility commands, kept for later:

```text
# HELD — gh repo archive omgawande1523/AegisEdge-Offline --yes
# HELD — gh repo archive "omgawande1523/Automatic-waste-segregation-with-computer-vision." --yes
# HELD — gh repo archive omgawande1523/Automatic-waste-segregation-with-computer-vision_01 --yes
# HELD — gh repo edit omgawande1523/gyrotex-social --visibility private --accept-visibility-change-consequences
# HELD — gh repo edit omgawande1523/Bot-Detector --visibility private --accept-visibility-change-consequences
```

## 4. Manual checklist (GitHub web UI)

- [ ] **Pin these 6 repos** (profile → "Customize your pins"): `Kolhapur-Digital-Twin`, `Major-Project-Simulation`, `Automatic-waste-segregation-with-computer-vision`, `PPE`, `Sarcasm-Detection`, `IntruShield`. Today "Popular repositories" shows three copies of the waste-segregation repo.
- [ ] **Finish the profile bio**: it's cut off at "I am passionate about AI, machine learning,". Suggested: "AI engineer · B.Tech AI '27 · computer vision & NLP on embedded and offline hardware".
- [ ] **Profile links**: website `https://om-os.vercel.app`, and add ORCID and LinkedIn as social accounts.
- [ ] **om-os repo "About"**: description, website and topics from row 1 above (or run the first command).
- [ ] **Profile README**: replace `omgawande1523/omgawande1523/README.md` with `github-profile/README.md`. That fixes CGPA 8.58 → 8.68, lists the internships, and drops Jarvis AI / Data Analytics Dashboard / RIM AI ERP, which aren't portfolio projects.
- [ ] **Contribution settings**: if you want private work counted, enable "Include private contributions" (profile → Contributions settings). The public calendar currently shows 265 contributions in the last year.
