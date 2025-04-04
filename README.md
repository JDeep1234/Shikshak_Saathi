# Shikshak Saathi - Empowering Teachers, Transforming Classrooms

**Shikshak Saathi (शिक्षक साथी, meaning "Teacher Companion")** is a teacher effectiveness platform designed specifically for Indian schools. It leverages AI-powered feedback, gamified professional development, and actionable insights to improve teaching quality and student outcomes. By addressing the unique challenges of Indian classrooms, Shikshak Saathi ensures that teacher training programs are effectively applied, leading to better learning experiences for students.

## **Key Challenges in Indian Schools**  
1. **Large Class Sizes:** Teachers often manage 40-60 students, making personalized attention difficult.  
2. **Limited Resources:** Many schools lack access to advanced technology or training resources.  
3. **Language Diversity:** India's multilingual classrooms require solutions that support multiple languages.  
4. **Teacher Accountability:** Inconsistent monitoring and evaluation systems make it hard to track teacher performance.  
5. **Student Outcomes:** Despite efforts, learning outcomes remain low, especially in rural and underserved areas.  



**Key Elements of Our Proposed Solution:**
- **Differentiators:** 
  - OCR-Based Grading & AI Feedback
  - Multilingual & Speech-to-Text
  - AI-Powered Question Answering using a RAG agent
  - NCERT-Aligned Curriculum
  - Gamified Quizzes & Analytics for Teachers

- **Unique Selling Proposition:**
  - Purpose-Built for Indian Classrooms - NCERT-aligned, multilingual
  - Advanced AI Integration for real-time feedback and intelligent classroom management
  - Gamification of Learning Pathways for Teacher Engagement
  - Offline & Low-Bandwidth Friendly

- **Problem Solution:**
  - By reducing administrative tasks and providing tools for real-time feedback, multilingual support, and offline functionality, Sikshak Saathi helps teachers manage large, diverse classrooms effectively.

- **Intended Impact:**
  - The solution improves teacher efficiency, saving 5-10 hours per week, and enhances student outcomes by fostering better engagement, personalized teaching, and real-time feedback.

- **Proposed Solution Benefits:**
  1. AI-Driven Solution: Automates administrative tasks and provides personalized insights
  2. Improved Teaching & Student Outcomes: AI-driven features enhance teaching quality
  3. Time & Work-Life Balance: Saves teachers 5-10 hours per week

## **Three Novel Features Tailored for Indian Schools**  
### **1. AI-Powered Multilingual Feedback Assistant**  
- **What it does:** Uses AI to analyze classroom interactions in **multiple Indian languages** (e.g., Hindi, Tamil, Bengali) and provides real-time, actionable feedback to teachers.  
- **Why it's novel:** Supports **multilingual classrooms**, ensuring teachers in diverse linguistic contexts receive relevant feedback.  
- **Example:** A teacher in a Hindi-medium school receives feedback like "छात्रों को अधिक प्रश्न पूछने के लिए प्रोत्साहित करें" (Encourage students to ask more questions).  

### **2. Gamified Professional Development Hub with Offline Access**  
- **What it does:** Offers **gamified training modules** that teachers can access offline, addressing limited internet connectivity in rural areas.  
- **Why it's novel:** Combines **gamification** with **offline accessibility**, making professional development engaging and accessible for all teachers.  
- **Example:** A teacher in a remote village earns a "Classroom Management Pro" badge after completing a training module.  

### **3. Insights Dashboard for School Leaders and Government Officials**  
- **What it does:** Provides **centralized dashboards** for school leaders and government officials to track teacher performance, training outcomes, and student learning trends across schools.  
- **Why it's novel:** Enables **data-driven decision-making** at both school and district levels, helping allocate resources effectively.  
- **Example:** A headmaster identifies classes with low student engagement and organizes targeted training programs.  

## **Solution Scalability**



**Scalability Features:**
- **Cloud-Based & Serverless:**
  - Enables seamless scalability for schools of all sizes.

- **Minimal Infrastructure Needs:**
  - Works on basic smartphones, shared devices, and low-bandwidth networks.

- **Offline & Open-Source AI:**
  - Ensures cost-effective, rapid scaling in rural and urban areas
  - MCP integration via Ollama enables efficient automation of administrative tasks
  - Provides personalized insights without internet connectivity

- **Seamless Integration:**
  - Aligns with NCERT content and existing education systems.

- **Additional Scalability Benefits:**
  - Transformative educational technology solution for diverse Indian schools
  - Cloud-based, serverless architecture breaks through traditional technological barriers
  - Ingenious design allows operation on basic smartphones and shared devices
  - Accessible in both rural and urban environments with limited infrastructure
  - Offline, open-source AI capabilities provide powerful administrative tools
  - Perfect alignment with NCERT content offers contextually relevant digital companion

## **Shikshak Saathi Platform Features**
![image](https://github.com/user-attachments/assets/d910b1bd-9ce8-44eb-b9f7-63ce5e2beb1d)



## **Technology Stack**




- **Frontend:**
  - Languages: React, HTML, CSS, JS, TypeScript
  - Frameworks: Next.js, Tailwind CSS

- **Backend:**
  - Languages: Node.js (JS), Python (Flask)  
  - Frameworks: Flask, Express, Electron.js
  - API: REST

- **Database:**
  - Relational DB: PostgreSQL
  - ORM: Prisma

- **Open-Source AI:**
  - Libraries: Sklearn, PyTorch, Transformers, Pydub
  - Speech-to-text APIs: Whisper(website) and FlashlightASR-wav2letter++ (offline)
  - Translation APIs/models: NLLB API by Meta
  - Image recognition and OCR: OpenCV, Tesseract, Llama-3.2 11B Vision
  - NLP: Hugging Face transformers for BERT
  - RAG agent: Meta-Llama-3.3 70B-Instruct and offline Ollama using MCP

## **Project Structure**  
### **1. AI-Powered Multilingual Feedback Assistant**  
- **Core Functionality:**  
  - Real-time speech analysis in multiple Indian languages.  
  - Instant feedback dashboard with actionable suggestions.  
  - Integration with training modules for personalized development.  
- **Tech Stack:**  
  - Gemini API for advanced feedback.
  - Google Translate for multilingual support.  
  - Next.js, Typescript, Tailwind CSS for the feedback dashboard.  
  - WebSocket for real-time communication.  

### **2. Gamified Professional Development Hub with Offline Access**  
- **Core Functionality:**  
  - Gamification elements (badges, leaderboards, rewards).  
  - Offline access to training modules and resources.  
  - Progress tracking and recognition system.  
- **Tech Stack:**  
  - Node.js for backend development.  
  - PostgreSQL for storing user progress and achievements.  
  - Next.js, Typescript for the gamified interface.  

### **3. Insights Dashboard for School Leaders and Government Officials**  
- **Core Functionality:**  
  - Visualizations (charts, graphs) of teacher performance and student outcomes.  
  - Trend analysis and actionable insights.  
  - Integration with classroom feedback and training data.  
- **Tech Stack:**
  - PostgreSQL for storing and querying large datasets.  
  - Next.js, Typescript for the dashboard interface.  

## **Alignment with Tasks**  
| **Task**                          | **Feature**                                      | **How It's Fulfilled**                                                                 |
|------------------------------------|--------------------------------------------------|---------------------------------------------------------------------------------------|
| **Monitoring & Feedback**         | AI-Powered Multilingual Feedback Assistant       | Provides real-time, objective feedback on teaching methods and classroom interactions. |
| **Post-Training Support**         | Gamified Professional Development Hub            | Offers ongoing support through training modules, resources, and personalized feedback. |
| **Implementation Tracking**       | Insights Dashboard                                | Tracks how teachers apply training concepts in the classroom.                         |
| **Classroom Observation**         | AI-Powered Multilingual Feedback Assistant       | Automates classroom observations through AI analysis.                                 |
| **Personalized Development Plans**| Gamified Professional Development Hub            | Generates personalized plans based on feedback and performance data.                  |
| **Admin Dashboard**               | Insights Dashboard for School Leaders            | Provides a centralized view of teacher performance and student outcomes.              |
| **Gamification and Recognition**  | Gamified Professional Development Hub            | Includes badges, leaderboards, and rewards to motivate teachers.                      |
| **Insights**                      | Insights Dashboard                                | Offers data-driven insights into teacher performance and student trends.              |
| **Mobile App for Accessibility**  | Mobile-Friendly Platform                         | Ensures teachers and administrators can access the platform on mobile devices.        |

## Website Home page

![image](https://github.com/user-attachments/assets/e83c8d34-844c-4a32-919c-bcb2bad5c730)

## Offline App
![image](https://github.com/user-attachments/assets/b534f1c7-1984-40d4-9421-fbe46dc74551)


## Updated Frontend
![Updated Frontend Design](https://github.com/user-attachments/assets/a60200c1-a968-4450-ad1d-aaed5cc4ae18)

## **Conclusion**  
Shikshak Saathi is a scalable, innovative, and impactful solution that addresses the challenges of Indian schools. By leveraging AI, gamification, and data analytics, it ensures that teacher training programs are effectively applied in the classroom, ultimately improving student outcomes.
