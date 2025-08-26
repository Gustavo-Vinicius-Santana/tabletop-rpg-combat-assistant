"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/ui/shadcn/components/sidebar";

import { MenuCollapse } from "./menuCollapse";

import {
  useCreateInimigoModal,
  useListInimigoModal,
  useCreatePersonagemModal,
  useListPersonagemModal,
} from "@/lib/stores/useModal";

import { useSidebar } from "@/ui/shadcn/components/sidebar";

export default function SideMenu() {
  const { onOpen: openCreatePersonagem } = useCreatePersonagemModal();
  const { onOpen: openListPersonagem } = useListPersonagemModal();

  const { onOpen: openCreateInimigo } = useCreateInimigoModal();
  const { onOpen: openListInimigo } = useListInimigoModal();

    const { setOpenMobile } = useSidebar();

  const closeMenu = () => {
    if (window.innerWidth <= 764) {
      setOpenMobile(false);
    }
  };

  const homeOptions = [
    { label: "Tabela personagens", href: "/", onClick: closeMenu },
    { label: "Combate", href: "/combate", onClick: closeMenu },
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
              <MenuCollapse title="Inimigos" options={monstrosOptions} />
              <MenuCollapse title="Personagens" options={personagensOptions} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}