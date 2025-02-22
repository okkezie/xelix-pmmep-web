'use client'
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { BalloonEditor, Mention, Bold, Essentials, Italic, Paragraph, List } from 'ckeditor5'
import { useEffect, useState } from "react"
import { Controller, useFormContext } from 'react-hook-form'
import TextAreaInput from "@/components/atoms/form/TextAreaInput/TextAreaInput"

import 'ckeditor5/ckeditor5.css'

export default function RichTextArea({
    name,
    defaultValue,
    onChangeHandler,
    containerClassName,
    placeholder,
    editorHeight='200px'
}) {
    const {
        formState: { errors },
    } = useFormContext()
    const [isMounted, setMounted] = useState(false)

    useEffect( () => {
        setMounted(true)
        return () => {
            setMounted(false)
        }
    }, [])

    return <>
    { isMounted ? (
        <div className={containerClassName}>
            <Controller
                name={name}
                render={({ field: { onChange } }) => (
                    <CKEditor
                        editor={ BalloonEditor }
                        config={ {
                            toolbar: {
                                items: [ 'bold', 'italic', '|', 'bulletedList', 'numberedList' ],
                            },
                            plugins: [
                                Essentials, Bold, Italic, Mention, Paragraph, List
                            ],
                            mention: { 
                                // Mention configuration
                            },
                            placeholder: `${placeholder}`
                        } }
                        onReady={(editor) => {
                            editor.editing.view.change((writer) => {
                                writer.setStyle(
                                    "height",
                                    editorHeight,
                                    editor.editing.view.document.getRoot()
                                )
                                writer.setStyle(
                                    "padding-left",
                                    '20px',
                                    editor.editing.view.document.getRoot()
                                )
                            })
                        }}
                        onChange={(event, editor) => {
                            const value = editor.data.get()
                            onChange({target: {name: name, value: value}})
                            onChangeHandler && onChangeHandler({target: { name: name, value: value}})
                        }}
                        data={ defaultValue }
                    />
                )} 
            />
        </div>
    ) 
    : <TextAreaInput
            maxLength={200}
            placeholder={placeholder}
            defaultValue={defaultValue}
            type="text"
            name={name}
            className="w-full bg-[#F5F5F5] h-[100px] lg:h-[150px] rounded-lg outline-none p-3"
        />
    }
        <p className="text-[12px] text-red mt-[2px]">
            {errors[name]?.message}
        </p>
    </>
}