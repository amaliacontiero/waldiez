/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { useCallback } from "react";

import { WaldiezNodeToolModalProps } from "@waldiez/containers/nodes/tool/modal/types";
import { DEFAULT_TOOL_CONTENT_MAP, WaldiezToolType } from "@waldiez/models";

/**
 * Custom hook for managing tool node modal state and interactions
 */
export const useToolNodeModal = (props: WaldiezNodeToolModalProps) => {
    const { data, onDataChange } = props;

    /**
     * Update all secrets at once
     */
    const onUpdateSecrets = useCallback(
        (secrets: { [key: string]: unknown }) => {
            onDataChange({ secrets });
        },
        [onDataChange],
    );

    /**
     * Delete a specific secret by key
     */
    const onDeleteSecret = useCallback(
        (key: string) => {
            const { [key]: _deletedSecret, ...remainingSecrets } = data.secrets;
            onDataChange({ secrets: remainingSecrets });
        },
        [data.secrets, onDataChange],
    );

    /**
     * Add a new secret or update an existing one
     */
    const onAddSecret = useCallback(
        (key: string, value: string) => {
            onDataChange({
                secrets: {
                    ...data.secrets,
                    [key]: value,
                },
            });
        },
        [data.secrets, onDataChange],
    );

    /**
     * Update tool content (code)
     */
    const onToolContentChange = useCallback(
        (value: string | undefined) => {
            if (!value) {
                return;
            }
            onDataChange({ content: value });
        },
        [onDataChange],
    );

    /**
     * Update tool label
     */
    const onToolLabelChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onDataChange({ label: e.target.value });
        },
        [onDataChange],
    );

    /**
     * Update tool description
     */
    const onToolDescriptionChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            onDataChange({ description: e.target.value });
        },
        [onDataChange],
    );

    /**
     * Change tool type and update content to default for that type
     */
    const onToolTypeChange = useCallback(
        (toolType: WaldiezToolType) => {
            const newContent = DEFAULT_TOOL_CONTENT_MAP[toolType];
            onDataChange({ toolType, content: newContent });
        },
        [onDataChange],
    );

    /**
     * Add a tag to the tool
     */
    const onAddTag = useCallback(
        (tag: string) => {
            onDataChange({
                tags: [...data.tags, tag],
            });
        },
        [data.tags, onDataChange],
    );

    /**
     * Remove a tag from the tool
     */
    const onDeleteTag = useCallback(
        (tag: string) => {
            onDataChange({
                tags: data.tags.filter(t => t !== tag),
            });
        },
        [data.tags, onDataChange],
    );

    /**
     * Change an existing tag
     */
    const onTagChange = useCallback(
        (oldItem: string, newItem: string) => {
            onDataChange({
                tags: data.tags.map(t => (t === oldItem ? newItem : t)),
            });
        },
        [data.tags, onDataChange],
    );

    /**
     * Add a requirement to the tool
     */
    const onAddRequirement = useCallback(
        (requirement: string) => {
            onDataChange({
                requirements: [...data.requirements, requirement],
            });
        },
        [data.requirements, onDataChange],
    );

    /**
     * Remove a requirement from the tool
     */
    const onDeleteRequirement = useCallback(
        (requirement: string) => {
            onDataChange({
                requirements: data.requirements.filter(r => r !== requirement),
            });
        },
        [data.requirements, onDataChange],
    );

    /**
     * Change an existing requirement
     */
    const onRequirementChange = useCallback(
        (oldRequirement: string, newRequirement: string) => {
            onDataChange({
                requirements: data.requirements.map(r => (r === oldRequirement ? newRequirement : r)),
            });
        },
        [data.requirements, onDataChange],
    );

    return {
        onUpdateSecrets,
        onDeleteSecret,
        onAddSecret,
        onToolContentChange,
        onToolLabelChange,
        onToolDescriptionChange,
        onToolTypeChange,
        onAddTag,
        onDeleteTag,
        onTagChange,
        onAddRequirement,
        onDeleteRequirement,
        onRequirementChange,
    };
};
