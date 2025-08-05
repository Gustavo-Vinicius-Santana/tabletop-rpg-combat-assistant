"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/ui/shadcn/components/sidebar";

import { MenuCollapse } from "./menuCollapse";

import {
  useCreateInimigoModal,
  useListInimigoModal,
  useCreatePersonagemModal,
  useListPersonagemModal,
} from "@/lib/stores/useModal";

export default function SideMenu() {
  const { onOpen: openCreatePersonagem } = useCreatePersonagemModal();
  const { onOpen: openListPersonagem } = useListPersonagemModal();

  const { onOpen: openCreateInimigo } = useCreateInimigoModal();
  const { onOpen: openListInimigo } = useListInimigoModal();

  const homeOptions = [
    { label: "Tabela personagens", href: "/" },
    { label: "Combate", href: "/combate" },
  ];

  const monstrosOptions = [
    { label: "Criar Inimigo", onClick: openCreateInimigo },
    { label: "Listar Inimigos", onClick: openListInimigo },
  ];

  const personagensOptions = [
    { label: "Criar Personagem", onClick: openCreatePersonagem },
    { label: "Listar Personagens", onClick: openListPersonagem },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Tabletop RPG Combat Assistant
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <MenuCollapse title="Home" options={homeOptions} />
              <MenuCollapse title="Monstros" options={monstrosOptions} />
              <MenuCollapse title="Personagens" options={personagensOptions} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}