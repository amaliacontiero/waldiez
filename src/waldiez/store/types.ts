/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { Edge, Node, ReactFlowInstance, Viewport } from "@xyflow/react";

import { createWaldiezStore } from "@waldiez/store/creator";
import {
    IWaldiezAgentStore,
    IWaldiezEdgeStore,
    IWaldiezFlowStore,
    IWaldiezModelStore,
    IWaldiezNodeStore,
    IWaldiezToolStore,
} from "@waldiez/types";

export { createWaldiezStore };

/**
 * WaldiezStoreProps
 * @param flowId - The ID of the flow
 * @param edges - The edges of the flow
 * @param nodes - The nodes of the flow
 * @param isAsync - Whether the flow is async or not
 * @param isReadOnly - Whether the flow is read only or not
 * @param skipImport - Whether to skip the import of the flow
 * @param skipExport - Whether to skip the export of the flow
 * @param cacheSeed - The seed for the cache
 * @param name - The name of the flow
 * @param description - The description of the flow
 * @param requirements - The requirements of the flow
 * @param storageId - The ID of the storage
 * @param createdAt - The creation date of the flow (as ISO 8601 string)
 * @param updatedAt - The update date of the flow (as ISO 8601 string)
 * @param tags - The tags of the flow
 * @param rfInstance - The react flow instance
 * @param viewport - The viewport of the flow
 * @param onRun - The handler for running the flow (send to backend)
 * @param onConvert - The handler for converting the flow (send to backend)
 * @param onUpload - The handler for file uploads (send to backend)
 * @param onChange - The handler for changes in the flow (send to backend)
 * @param onSave - The handler for saving the flow (send to backend)
 */
export type WaldiezStoreProps = {
    flowId: string;
    edges: Edge[];
    nodes: Node[];
    isAsync?: boolean;
    isReadOnly?: boolean;
    skipImport?: boolean;
    skipExport?: boolean;
    cacheSeed?: number | null;
    name?: string;
    description?: string;
    requirements?: string[];
    storageId?: string;
    createdAt?: string;
    updatedAt?: string;
    tags?: string[];
    rfInstance?: ReactFlowInstance;
    viewport?: Viewport;
    previousViewport?: Viewport; // used to store the previous viewport when switching node types
    onRun?: ((flow: string) => void) | null; // handler for running the flow (send to backend
    onConvert?: ((flow: string, to: "py" | "ipynb") => void) | null; // handler for converting the flow (send to backend)
    onUpload?: ((files: File[]) => Promise<string[]>) | null; // handler for file uploads (send to backend)
    onChange?: ((content: string) => void) | null; // handler for changes in the flow (send to backend)
    onSave?: ((flow: string) => void) | null; // handler for saving the flow (send to backend)
};

/**
 * WaldiezFlowInfo
 * @param flowId - The ID of the flow
 * @param storageId - The ID of the storage
 * @param name - The name of the flow
 * @param description - The description of the flow
 * @param tags - The tags of the flow
 * @param requirements - The requirements of the flow
 * @param isAsync - Whether the flow is async or not
 * @param cacheSeed - The seed for the cache
 */
export type WaldiezFlowInfo = {
    flowId: string;
    storageId: string;
    name: string;
    description: string;
    tags: string[];
    requirements: string[];
    isAsync: boolean;
    cacheSeed: number | null;
};

/**
 * ImportedFlow
 * @param name - The name of the flow
 * @param description - The description of the flow
 * @param requirements - The requirements of the flow
 * @param createdAt - The creation date of the flow (as ISO 8601 string)
 * @param updatedAt - The update date of the flow (as ISO 8601 string)
 * @param isAsync - Whether the flow is async or not
 * @param cacheSeed - The seed for the cache
 * @param tags - The tags of the flow
 * @param nodes - The nodes of the flow
 * @param edges - The edges of the flow
 */
export type ImportedFlow = {
    name: string;
    description: string;
    requirements: string[];
    createdAt?: string;
    updatedAt?: string;
    isAsync?: boolean;
    cacheSeed?: number | null;
    tags: string[];
    nodes: Node[];
    edges: Edge[];
};

/**
 * ThingsToImport
 * @param override - Whether to override the existing flow
 * @param everything - Whether to import everything
 * @param name - Whether to import the name
 * @param description - Whether to import the description
 * @param tags - Whether to import the tags
 * @param requirements - Whether to import the requirements
 * @param isAsync - Whether to import the async property
 * @param cacheSeed - Whether to import the cache seed
 * @param nodes - The nodes to import
 * @param edges - The edges to import
 */
export type ThingsToImport = {
    override: boolean;
    everything: boolean;
    name: boolean;
    description: boolean;
    tags: boolean;
    requirements: boolean;
    isAsync: boolean;
    cacheSeed?: boolean | null;
    nodes: {
        models: Node[];
        tools: Node[];
        agents: Node[];
    };
    edges: Edge[];
};

/**
 * WaldiezState
 * @param flowId - The ID of the flow
 * @param edges - The edges of the flow
 * @param nodes - The nodes of the flow
 * @param isAsync - Whether the flow is async or not
 * @param isReadOnly - Whether the flow is read only or not
 * @param skipImport - Whether to skip the import of the flow
 * @param skipExport - Whether to skip the export of the flow
 * @param cacheSeed - The seed for the cache
 * @param name - The name of the flow
 * @param description - The description of the flow
 * @param requirements - The requirements of the flow
 * @param storageId - The ID of the storage
 * @param createdAt - The creation date of the flow (as ISO 8601 string)
 * @param updatedAt - The update date of the flow (as ISO 8601 string)
 * @param tags - The tags of the flow
 * @param rfInstance - The react flow instance
 * @param viewport - The viewport of the flow
 * @param onRun - The handler for running the flow (send to backend)
 * @param onConvert - The handler for converting the flow (send to backend)
 * @param onUpload - The handler for file uploads (send to backend)
 * @param onChange - The handler for changes in the flow (send to backend)
 * @param onSave - The handler for saving the flow (send to backend)
 * @param monacoVsPath - The path to the monaco vs code editor
 * @see {@link WaldiezStoreProps}
 * @see {@link IWaldiezToolStore}
 * @see {@link IWaldiezEdgeStore}
 * @see {@link IWaldiezModelStore}
 * @see {@link IWaldiezAgentStore}
 * @see {@link IWaldiezNodeStore}
 * @see {@link IWaldiezFlowStore}
 */
export type WaldiezState = WaldiezStoreProps &
    IWaldiezToolStore &
    IWaldiezEdgeStore &
    IWaldiezModelStore &
    IWaldiezAgentStore &
    IWaldiezNodeStore &
    IWaldiezFlowStore;

/**
 * typeOfSet
 * @param partial - The partial state to set
 * @param replace - Whether to replace the state or not
 * @see {@link WaldiezState}
 */
export type typeOfSet = {
    (
        partial:
            | WaldiezState
            | Partial<WaldiezState>
            | ((state: WaldiezState) => WaldiezState | Partial<WaldiezState>),
        replace?: false,
    ): void;
};
/**
 * typeOfGet
 * @see {@link WaldiezState}
 */
export type typeOfGet = () => WaldiezState;

/**
 * typeOfGetState
 * @see {@link WaldiezState}
 */
export type WaldiezStore = ReturnType<typeof createWaldiezStore>;

/**
 * WaldiezProviderProps
 * @param children - The children of the provider
 * @param flowId - The ID of the flow
 * @param edges - The edges of the flow
 * @param nodes - The nodes of the flow
 * @param isAsync - Whether the flow is async or not
 * @param isReadOnly - Whether the flow is read only or not
 * @param skipImport - Whether to skip the import of the flow
 * @param skipExport - Whether to skip the export of the flow
 * @param cacheSeed - The seed for the cache
 * @param name - The name of the flow
 * @param description - The description of the flow
 * @param requirements - The requirements of the flow
 * @param storageId - The ID of the storage
 * @param createdAt - The creation date of the flow (as ISO 8601 string)
 * @param updatedAt - The update date of the flow (as ISO 8601 string)
 * @param tags - The tags of the flow
 * @param rfInstance - The react flow instance
 * @param viewport - The viewport of the flow
 * @param onRun - The handler for running the flow (send to backend)
 * @param onConvert - The handler for converting the flow (send to backend)
 * @param onUpload - The handler for file uploads (send to backend)
 * @param onChange - The handler for changes in the flow (send to backend)
 * @param onSave - The handler for saving the flow (send to backend)
 * @param monacoVsPath - The path to the monaco vs code editor
 */
export type WaldiezProviderProps = React.PropsWithChildren<WaldiezStoreProps>;
