"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type ModalId = "book" | "quote" | "policy" | "review" | "recurring" | null;

interface Ctx {
  modal: ModalId;
  open: (id: ModalId, serviceId?: string) => void;
  close: () => void;
  preService: string;
}

const ModalCtx = createContext<Ctx>({ modal: null, open: () => {}, close: () => {}, preService: "" });

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalId>(null);
  const [preService, setPreService] = useState("");

  const open = useCallback((id: ModalId, serviceId = "") => {
    setPreService(serviceId);
    setModal(id);
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setModal(null);
    document.body.style.overflow = "";
  }, []);

  return <ModalCtx.Provider value={{ modal, open, close, preService }}>{children}</ModalCtx.Provider>;
}

export const useModal = () => useContext(ModalCtx);
