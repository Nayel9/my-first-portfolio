import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", lastname: "", company: "", email: "", message: "" });
    const [status, setStatus] = useState("");
    const [error, setError] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({});
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFieldErrors({ ...fieldErrors, [e.target.name]: false });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("");
        setError(false);
        let newErrors: { [key: string]: boolean } = {};

        // Vérification des champs vides
        ["name", "lastname", "email", "message"].forEach((field) => {
            if (!formData[field as keyof typeof formData]) {
                newErrors[field] = true;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setFieldErrors(newErrors);
            setStatus("Veuillez remplir tous les champs obligatoires ❌");
            setError(true);
            return;
        }

        setStatus("Envoi en cours...");

        try {
            const res = await fetch("https://formspree.io/f/xoveajop", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("Message envoyé ! ✅");
                setFormData({ name: "", lastname: "", company: "", email: "", message: "" });
                setTimeout(() => setStatus(""), 3000);
            } else {
                throw new Error("Erreur lors de l'envoi.");
            }
        } catch (error) {
            setStatus("Erreur lors de l'envoi ❌");
            setError(true);
        }
    };

    return (
        <section id="contact" ref={ref} className="py-20 px-6 bg-gray-100 text-gray-900">
            <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-bold text-center"
            >
                Contactez-moi
            </motion.h2>

            <motion.form
                onSubmit={handleSubmit}
                ref={ref}
                className="max-w-lg mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : error ? { x: [-10, 10, -10, 10, 0] } : { opacity: 0, y: -30 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                {[
                    { label: "Nom", name: "name", type: "text" },
                    { label: "Prénom", name: "lastname", type: "text" },
                    { label: "Société (facultatif)", name: "company", type: "text" },
                    { label: "Email", name: "email", type: "email" },
                ].map(({ label, name, type }) => (
                    <div key={name} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">{label}</label>
                        <input
                            type={type}
                            name={name}
                            value={formData[name as keyof typeof formData]}
                            onChange={handleChange}
                            className={`mt-1 block w-full p-2 border rounded-md ${fieldErrors[name] ? "border-red-500" : ""}`}
                        />
                        {fieldErrors[name] && <p className="text-red-500 text-sm">Ce champ est obligatoire</p>}
                    </div>
                ))}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={`mt-1 block w-full p-2 border rounded-md h-24 ${fieldErrors.message ? "border-red-500" : ""}`}
                    />
                    {fieldErrors.message && <p className="text-red-500 text-sm">Ce champ est obligatoire</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                >
                    Envoyer
                </button>

                {status && (
                    <motion.div
                        className={`mt-4 flex items-center justify-center text-sm ${error ? "text-red-500" : "text-green-500"}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {error ? <FaTimesCircle className="mr-2 text-xl" /> : <FaCheckCircle className="mr-2 text-xl" />}
                        <p>{status}</p>
                    </motion.div>
                )}
            </motion.form>
        </section>
    );
}
